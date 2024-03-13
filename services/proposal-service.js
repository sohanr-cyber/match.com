import ProposalRepository from '@/database/repository/proposal-repository'
import { FormateData } from '@/utility'
import UserService from './user-service'
import NotificationService from './notification-service'

class ProposalService {
  constructor () {
    this.repository = new ProposalRepository()
    this.userService = new UserService()
    this.NotificationService = new NotificationService()
  }

  async FindProposalsByUserId (UserId) {
    try {
      const existingProposal = await this.repository.FindProposalsByUserId(
        UserId
      )

      return FormateData(existingProposal)
    } catch (error) {
      console.log(error)
    }
  }

  async FindProposalById (UserId) {
    try {
      const existingProposal = await this.repository.FindProposalById(UserId)
      return FormateData(existingProposal)
    } catch (error) {
      console.log(error)
    }
  }

  // Accept Proposal
  async UpdateProposal ({ Id, status, acceptor, sender }) {
    try {
      const existing = await this.repository.UpdateProposal({
        Id,
        status
      })

      const existingUser = await this.userService.AcceptUserProposal({
        acceptor,
        sender
      })

      // send proposal notification
      await this.NotificationService.sendProposalNotificationToSender({
        senderName: existing.sender.name,
        senderId: existing.sender._id,
        recieverEmail: existing.reciever.email,
        recieverId: existing.reciever._id,
        recieverName: existing.reciever.name,
        status: existing.status.toLowerCase(),
        message: existing.message,
        senderEmail: existing.sender.email
      })

      console.log(existing)
      return FormateData(existing)
    } catch (error) {
      console.log(error)
    }
  }

  // Decline Proposal
  async DeclineProposal ({ Id, status }) {
    try {
      const existing = await this.repository.UpdateProposal({
        Id,
        status
      })

      // send proposal notification
      await this.NotificationService.sendProposalNotificationToSender({
        senderName: existing.sender.name,
        senderId: existing.sender._id,
        recieverEmail: existing.reciever.email,
        recieverId: existing.reciever._id,
        recieverName: existing.reciever.name,
        status: existing.status.toLowerCase(),
        message: existing.message,
        senderEmail: existing.sender.email
      })

      return FormateData(existing)
    } catch (error) {
      console.log(error)
    }
  }

  async WithdrawUserProposal ({ Id, sender, reciever, status }) {
    try {
      const existing = await this.repository.UpdateProposal({
        Id,
        status
      })
      const updatedUsers = await this.userService.WithdrawUserProposal({
        Id,
        sender,
        reciever
      })

      // send proposal notification
      await this.NotificationService.sendProposalNotificationUpdateToReciever({
        senderName: existing.sender.name,
        senderId: existing.sender._id,
        recieverEmail: existing.reciever.email,
        recieverId: existing.reciever._id,
        recieverName: existing.reciever.name,
        status: existing.status.toLowerCase()
      })

      return
    } catch (error) {}
  }

  async CreateProposal (DataToCreate) {
    try {
      const newProposal = await this.repository.CreateProposal(DataToCreate)
      const updatedUser = await this.userService.UpdateUserProposal({
        sender: newProposal.sender,
        reciever: newProposal.reciever
      })

      const existing = await this.FindProposalById(newProposal._id)
      // send proposal notification
      await this.NotificationService.sendProposalNotificationToReciever({
        senderName: existing.sender.name,
        senderId: existing.sender._id,
        recieverEmail: existing.reciever.email,
        recieverId: existing.reciever._id,
        recieverName: existing.reciever.name,
        status: 'pending',
        message: existing.message
      })
      console.log(existing.message)
      return FormateData(newProposal)
    } catch (error) {
      console.log(error)
    }
  }

  async Pock ({ Id }) {
    try {
      const existing = await this.repository.UpdatePoke(Id)
      console.log({ existing })
      if (!existing.error) {
        // send proposal notification
        await this.NotificationService.sendProposalResendNotificationToReciever(
          {
            senderName: existing.sender.name,
            senderId: existing.sender._id,
            recieverEmail: existing.reciever.email,
            recieverId: existing.reciever._id,
            recieverName: existing.reciever.name,
            status: 'resend',
            message: existing.message
          }
        )

        // await this.NotificationService.sendMessage()
        return { msg: `pocked(${existing.pokeCount}) sucesfull !` }
      } else {
        consoel.log(error)
        return { error: existing.error }
      }
    } catch (error) {
      return { error: 'error occured' }
    }
  }
}

export default ProposalService
