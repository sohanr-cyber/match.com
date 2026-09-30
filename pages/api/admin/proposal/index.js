import { proposalStatuses } from '@/utility/proposal-timeline'
import nextConnect from 'next-connect'
import Proposal from '@/database/model/Proposal'
import { isAuth } from '@/utils'
import requireAdmin from '@/utility/admin-auth'

const handler = nextConnect({ onNoMatch: (req, res) => res.status(405).json({ error: 'Method not allowed.' }) })
handler.use(isAuth).use(requireAdmin)
handler.get(async (req, res) => {
  const status = req.query.status || 'all'
  if (typeof status !== 'string' || !['all', ...proposalStatuses].includes(status)) {
    return res.status(400).json({ error: 'Invalid proposal status.' })
  }
  const page = Number(req.query.page || 1)
  if (!Number.isSafeInteger(page) || page < 1 || page > 100000) {
    return res.status(400).json({ error: 'Invalid page number.' })
  }
  const limit = 20
  const filter = status === 'all' ? {} : { status }
  try {
    const [proposals, total] = await Promise.all([
      Proposal.find(filter).select('sender reciever status createdAt updatedAt')
        .sort({ createdAt: -1, _id: -1 }).skip((page - 1) * limit).limit(limit)
        .populate('sender', 'name profileId').populate('reciever', 'name profileId').lean(),
      Proposal.countDocuments(filter)
    ])
    return res.status(200).json({ proposals, total, page, pages: Math.max(1, Math.ceil(total / limit)) })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Could not load proposals.' })
  }
})
export default handler