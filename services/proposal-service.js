import db from '@/database/connection'
import Proposal from '@/database/model/Proposal'
import User from '@/database/model/User'
import Message from './message-service'
import { appendProposalEvent, proposalStages, connectedProposalStatuses } from '@/utility/proposal-timeline'

class ProposalService {
  constructor () {
    this.message = new Message()
  }

  async notify (userId, text, notificationType = 'proposal update', relatedUserId, profileRelation = 'Related to') {
    let recipient
    try {
      const [user, relatedUser] = await Promise.all([
        User.findById(userId).select('+phone').lean(),
        User.findById(relatedUserId).select('profileId').lean()
      ])
      if (!user) {
        console.info(`[SMS] Skipped ${notificationType}: recipient account not found.`)
        return
      }
      if (!user.phone) {
        console.info(`[SMS] Skipped ${notificationType}: recipient has no phone number.`)
        return
      }
      if (!user.isVerified) {
        console.info(`[SMS] Skipped ${notificationType}: recipient phone is not verified.`)
        return
      }
      if (!relatedUser?.profileId) {
        console.info(`[SMS] Skipped ${notificationType}: related profile ID is unavailable.`)
        return
      }
      const contextualMessage = `${text} ${profileRelation} profile ID ${relatedUser.profileId}.`
      recipient = String(user.phone).replace(/\d(?=\d{3})/g, '•')
      const environment = process.env.NODE_ENV || 'development'
      console.info(`[SMS] Sending ${notificationType} to ${recipient} (${environment}).`)
      const result = await this.message.sendMessage({ number: user.phone, message: contextualMessage })
      console.info(`[SMS] ${notificationType} accepted by provider for ${recipient}.`, {
        responseCode: result?.response_code
      })
    } catch (error) {
      console.error(`[SMS] ${notificationType} failed${recipient ? ` for ${recipient}` : ''}:`, error.message)
    }
  }

  async FindProposalsByUserId (userId) {
    await db.connect()
    return Proposal.find({ $or: [{ sender: userId }, { reciever: userId }] })
      .select('-timeline')
      .sort({ updatedAt: -1 })
      .limit(100)
      .populate('sender', '_id name gender profession height skinColor city district upazilla profileId')
      .populate('reciever', '_id name gender profession height skinColor city district upazilla profileId')
      .lean()
  }

  async FindProposalByIdForUser (proposalId, userId) {
    await db.connect()
    const proposal = await Proposal.findOne({
      _id: proposalId,
      $or: [{ sender: userId }, { reciever: userId }]
    })
      .select('sender reciever status message resolvedAt pockedAt pokeCount createdAt updatedAt timeline')
      .populate('sender', '_id name gender profession city profileId')
      .populate('reciever', '_id name gender profession city profileId')
      .populate('timeline.actor', 'name')
      .lean()
    if (!proposal) return null
    proposal.timeline = (proposal.timeline || []).map(event => ({
      _id: event._id,
      type: event.type,
      status: event.status,
      at: event.at,
      actorRole: event.actorRole,
      actor: event.actorRole === 'admin' ? { name: 'Admin' } : event.actor,
      ...(event.actorRole !== 'admin' && event.note ? { note: event.note } : {})
    }))
    return proposal
  }

  async CreateProposal ({ sender, reciever, message }) {
    await db.connect()
    if (!sender || !reciever || String(sender) === String(reciever)) {
      return { error: 'Choose another profile to send a proposal.' }
    }
    const [senderUser, receiverUser] = await Promise.all([
      User.findById(sender).select('isVerified').lean(),
      User.findById(reciever).select('active').lean()
    ])
    if (!senderUser?.isVerified) return { error: 'Verify your account before sending proposals.' }
    if (!receiverUser?.active) return { error: 'This profile is not accepting proposals.' }
    const duplicate = await Proposal.exists({
      sender,
      reciever,
      status: { $in: proposalStages }
    })
    if (duplicate) return { error: 'You already have an open proposal with this profile.' }

    const proposal = await Proposal.create({
      sender,
      reciever,
      message: String(message || '').trim().slice(0, 1000),
      timeline: [{ type: 'created', status: 'pending', actor: sender, actorRole: 'member', at: new Date() }]
    })
    await Promise.all([
      User.updateOne({ _id: sender }, { $addToSet: { proposalSent: reciever } }),
      User.updateOne({ _id: reciever }, { $addToSet: { proposalRecieved: sender } })
    ])
    await this.notify(reciever, 'You have a new marriage proposal. Sign in to review it.', 'new proposal', sender, 'From')
    return proposal
  }

  async UpdateProposal ({ Id, actorId }) {
    await db.connect()
    const proposal = await Proposal.findById(Id)
    if (!proposal) return { error: 'Proposal not found.' }
    if (String(proposal.reciever) !== String(actorId)) return { error: 'Not authorized.' }
    if (proposal.status !== 'pending') return { error: 'This proposal is already resolved.' }

    appendProposalEvent(proposal, { status: 'Accepted', actor: actorId })
    proposal.status = 'Accepted'
    proposal.resolvedAt = new Date()
    await proposal.save()
    await Promise.all([
      User.updateOne({ _id: proposal.sender }, { $addToSet: { proposalAccepted: proposal.reciever } }),
      User.updateOne({ _id: proposal.reciever }, { $addToSet: { proposalAccepted: proposal.sender } })
    ])
    await this.notify(proposal.sender, 'Your proposal was accepted. Sign in to view the connection.', 'proposal accepted', proposal.reciever, 'Accepted by')
    return proposal
  }

  async DeclineProposal ({ Id, actorId }) {
    await db.connect()
    const proposal = await Proposal.findById(Id)
    if (!proposal) return { error: 'Proposal not found.' }
    if (String(proposal.reciever) !== String(actorId)) return { error: 'Not authorized.' }
    if (proposal.status !== 'pending') return { error: 'This proposal is already resolved.' }

    appendProposalEvent(proposal, { status: 'Declined', actor: actorId })
    proposal.status = 'Declined'
    proposal.resolvedAt = new Date()
    await proposal.save()
    await this.notify(proposal.sender, 'Your proposal was declined. Sign in to review it.', 'proposal declined', proposal.reciever, 'To')
    return proposal
  }

  async WithdrawUserProposal ({ Id, actorId }) {
    await db.connect()
    const proposal = await Proposal.findById(Id)
    if (!proposal) return { error: 'Proposal not found.' }
    if (String(proposal.sender) !== String(actorId)) return { error: 'Not authorized.' }
    if (proposal.status !== 'pending') return { error: 'Only pending proposals can be withdrawn.' }

    appendProposalEvent(proposal, { status: 'Withdrawn', actor: actorId })
    proposal.status = 'Withdrawn'
    proposal.resolvedAt = new Date()
    await proposal.save()
    await Promise.all([
      User.updateOne({ _id: proposal.sender }, { $pull: { proposalSent: proposal.reciever } }),
      User.updateOne({ _id: proposal.reciever }, { $pull: { proposalRecieved: proposal.sender } })
    ])
    await this.notify(proposal.reciever, 'A proposal was withdrawn. Sign in to review it.', 'proposal withdrawn', proposal.sender, 'From')
    return proposal
  }

  async AdminUpdateStatus ({ Id, actorId, status, note, expectedUpdatedAt }) {
    await db.connect()
    const proposal = await Proposal.findById(Id)
    if (!proposal) return { error: 'Proposal not found.', code: 404 }
    if (proposal.updatedAt.toISOString() !== expectedUpdatedAt) {
      return { error: 'This proposal changed. Refresh before updating its status.', code: 409 }
    }
    if (proposal.status === status) return { error: 'Choose a different status.', code: 400 }
    if (proposalStages.includes(status)) {
      const duplicate = await Proposal.exists({
        _id: { $ne: proposal._id }, sender: proposal.sender, reciever: proposal.reciever,
        status: { $in: proposalStages }
      })
      if (duplicate) return { error: 'Another open proposal already exists between these members.', code: 409 }
    }
    appendProposalEvent(proposal, { status, actor: actorId, actorRole: 'admin', note })
    proposal.status = status
    proposal.resolvedAt = status === 'pending' ? undefined : new Date()
    try {
      await proposal.save()
    } catch (error) {
      if (error.name === 'VersionError') return { error: 'This proposal changed. Refresh before updating its status.', code: 409 }
      throw error
    }
    // Derive legacy profile relationship arrays from the remaining proposals.
    const [accepted, sent] = await Promise.all([
      Proposal.exists({ status: { $in: connectedProposalStatuses }, $or: [
        { sender: proposal.sender, reciever: proposal.reciever },
        { sender: proposal.reciever, reciever: proposal.sender }
      ] }),
      Proposal.exists({ sender: proposal.sender, reciever: proposal.reciever, status: { $ne: 'Withdrawn' } })
    ])
    const acceptedUpdate = accepted ? '$addToSet' : '$pull'
    const sentUpdate = sent ? '$addToSet' : '$pull'
    await Promise.all([
      User.updateOne({ _id: proposal.sender }, { [acceptedUpdate]: { proposalAccepted: proposal.reciever } }),
      User.updateOne({ _id: proposal.reciever }, { [acceptedUpdate]: { proposalAccepted: proposal.sender } }),
      User.updateOne({ _id: proposal.sender }, { [sentUpdate]: { proposalSent: proposal.reciever } }),
      User.updateOne({ _id: proposal.reciever }, { [sentUpdate]: { proposalRecieved: proposal.sender } })
    ])
    return { proposal }
  }
  async Pock ({ Id, actorId }) {
    await db.connect()
    const proposal = await Proposal.findById(Id)
    if (!proposal) return { error: 'Proposal not found.' }
    if (String(proposal.sender) !== String(actorId)) return { error: 'Not authorized.' }
    if (proposal.status !== 'pending') return { error: 'Only pending proposals can be reminded.' }
    if (proposal.pokeCount >= 3) return { error: 'Reminder limit reached.' }
    if (proposal.pockedAt && Date.now() - new Date(proposal.pockedAt).getTime() < 24 * 60 * 60 * 1000) {
      return { error: 'Please wait a day before sending another reminder.' }
    }
    appendProposalEvent(proposal, { type: 'reminder', actor: actorId })
    proposal.pokeCount += 1
    proposal.pockedAt = new Date()
    await proposal.save()
    await this.notify(proposal.reciever, 'You have a proposal reminder. Sign in to review it.', 'proposal reminder', proposal.sender, 'From')
    return {
      msg: 'Reminder sent.',
      nextReminderAt: new Date(proposal.pockedAt.getTime() + 24 * 60 * 60 * 1000).toISOString(),
      remindersRemaining: Math.max(0, 3 - proposal.pokeCount)
    }
  }
}

export default ProposalService
