import { connectedProposalStatuses } from '@/utility/proposal-timeline'
import db from '@/database/connection'
import User from '@/database/model/User'
import Proposal from '@/database/model/Proposal'
import Family from '@/database/model/Family'
import Address from '@/database/model/Address'
import Religion from '@/database/model/Religion'
import Physical from '@/database/model/Physical'
import Education from '@/database/model/Education'
import Expectation from '@/database/model/Expectation'
import { isValidObjectId } from '@/utility/helper'

export async function readProfile ({ id, viewerId, update }) {
  await db.connect()
  const query = isValidObjectId(id) ? { _id: id } : { profileId: id }
  const user = await User.findOne(query)
    .select('-password -salt -verificationCode -verificationAttempts -expirationTime -lastVerificationSentAt')
    .lean()
  if (!user) return null

  const userId = user._id
  const ownProfile = Boolean(viewerId && String(userId) === String(viewerId))
  const connected = !ownProfile && viewerId
    ? Boolean(await Proposal.exists({
        status: { $in: connectedProposalStatuses },
        $or: [
          { sender: viewerId, reciever: userId },
          { sender: userId, reciever: viewerId }
        ]
      }))
    : false

  const sections = {
    family: update && update !== 'family' ? Promise.resolve(null) : Family.findOne({ user: userId }).lean(),
    address: update && update !== 'address' ? Promise.resolve(null) : Address.findOne({ user: userId }).lean(),
    religion: update && update !== 'religion' ? Promise.resolve(null) : Religion.findOne({ user: userId }).lean(),
    physical: update && update !== 'physical' ? Promise.resolve(null) : Physical.findOne({ user: userId }).lean(),
    education: update && update !== 'education' ? Promise.resolve(null) : Education.findOne({ user: userId }).lean(),
    expectation: update && update !== 'expectation' ? Promise.resolve(null) : Expectation.findOne({ user: userId }).lean()
  }
  const [family, address, religion, physical, education, expectation] = await Promise.all(Object.values(sections))

  if (!ownProfile) {
    if (!connected) user.name = '*****'
    delete user.email
    delete user.phone
    delete user.proposalSent
    delete user.proposalRecieved
    delete user.proposalAccepted
    delete user.savedIds
    delete user.saverIds
    if (address && !connected) {
      address.phone = '*****'
      address.phone2 = '*****'
      address.email = '*****'
      address.location = '*****'
      delete address.GeolocationCoordinates
    }
  }

  return {
    existingUser: user,
    family: family || {},
    address: address || {},
    religion: religion || {},
    physical: physical || {},
    education: education || {},
    expectation: expectation || {}
  }
}
