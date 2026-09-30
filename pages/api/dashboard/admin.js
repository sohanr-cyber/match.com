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
    const admin = await User.findById(req.user._id).select('role').lean()
    if (!admin || admin.role !== 'admin') return res.status(403).json({ error: 'Admin access required.' })

    const since = new Date()
    since.setDate(since.getDate() - 6)
    since.setHours(0, 0, 0, 0)
    const [totalUsers, activeUsers, verifiedUsers, newUsers, totalProposals, pendingProposals, acceptedProposals, recentUsers, recentProposals, signups] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ active: true }),
      User.countDocuments({ isVerified: true }),
      User.countDocuments({ createdAt: { $gte: since } }),
      Proposal.countDocuments(),
      Proposal.countDocuments({ status: 'pending' }),
      Proposal.countDocuments({ status: { $in: connectedProposalStatuses } }),
      User.find().sort({ createdAt: -1 }).limit(6).select('name profileId role active isVerified createdAt').lean(),
      Proposal.find().sort({ createdAt: -1 }).limit(6).select('sender reciever status createdAt')
        .populate('sender', 'name profileId')
        .populate('reciever', 'name profileId')
        .lean(),
      User.aggregate([
        { $match: { createdAt: { $gte: since } } },
        { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }, count: { $sum: 1 } } },
        { $sort: { _id: 1 } }
      ])
    ])
    return res.status(200).json({
      stats: { totalUsers, activeUsers, verifiedUsers, newUsers, totalProposals, pendingProposals, acceptedProposals },
      recentUsers,
      recentProposals: recentProposals.map(item => ({
        id: item._id,
        sender: item.sender?.name || 'Member',
        reciever: item.reciever?.name || 'Member',
        status: item.status,
        createdAt: item.createdAt
      })),
      signups
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Could not load admin dashboard.' })
  }
})

export default handler
