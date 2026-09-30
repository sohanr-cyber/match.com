import { connectedProposalStatuses } from '@/utility/proposal-timeline'
import db from '@/database/connection'
import User from '@/database/model/User'
import Proposal from '@/database/model/Proposal'
import { isAuth } from '@/utils'
import nextConnect from 'next-connect'

const handler = nextConnect()
handler.use(isAuth)

handler.get(async (req, res) => {
  try {
    await db.connect()
    const id = req.user._id
    const user = await User.findById(id)
      .select('name profileId role isVerified active savedIds createdAt')
      .lean()
    if (!user) return res.status(404).json({ error: 'Account not found.' })

    const [incoming, outgoing, pending, accepted, recent] = await Promise.all([
      Proposal.countDocuments({ reciever: id }),
      Proposal.countDocuments({ sender: id }),
      Proposal.countDocuments({ reciever: id, status: 'pending' }),
      Proposal.countDocuments({ $or: [{ sender: id }, { reciever: id }], status: { $in: connectedProposalStatuses } }),
      Proposal.find({ $or: [{ sender: id }, { reciever: id }] })
        .sort({ updatedAt: -1 })
        .limit(6)
        .select('sender reciever status updatedAt')
        .populate('sender', 'name profileId')
        .populate('reciever', 'name profileId')
        .lean()
    ])
    return res.status(200).json({
      user,
      stats: { incoming, outgoing, pending, accepted, saved: user.savedIds?.length || 0 },
      recent: recent.map(item => {
        const received = String(item.reciever?._id) === String(id)
        const other = received ? item.sender : item.reciever
        return {
          id: item._id,
          direction: received ? 'Received' : 'Sent',
          name: other?.name || 'Member',
          profileId: other?.profileId,
          status: item.status,
          updatedAt: item.updatedAt
        }
      })
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Could not load dashboard.' })
  }
})

export default handler
