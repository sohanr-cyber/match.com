import nextConnect from 'next-connect'
import ProposalService from '@/services/proposal-service'
import { proposalStatuses } from '@/utility/proposal-timeline'
import Proposal from '@/database/model/Proposal'
import { isAuth } from '@/utils'
import requireAdmin from '@/utility/admin-auth'

const handler = nextConnect({ onNoMatch: (req, res) => res.status(405).json({ error: 'Method not allowed.' }) })
handler.use(isAuth).use(requireAdmin)
handler.get(async (req, res) => {
  if (typeof req.query.id !== 'string' || !/^[a-f\d]{24}$/i.test(req.query.id)) {
    return res.status(400).json({ error: 'Invalid proposal ID.' })
  }
  try {
    const proposal = await Proposal.findById(req.query.id)
      .select('sender reciever status message resolvedAt pockedAt pokeCount createdAt updatedAt timeline')
      .populate('sender', 'name profileId').populate('reciever', 'name profileId')
      .populate('timeline.actor', 'name').lean()
    if (!proposal) return res.status(404).json({ error: 'Proposal not found.' })
    return res.status(200).json({ proposal })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Could not load proposal details.' })
  }
})
handler.patch(async (req, res) => {
  if (typeof req.query.id !== 'string' || !/^[a-f\d]{24}$/i.test(req.query.id)) {
    return res.status(400).json({ error: 'Invalid proposal ID.' })
  }
  const { status, note = '', expectedUpdatedAt } = req.body || {}
  if (!proposalStatuses.includes(status) || typeof note !== 'string' || note.length > 1000 ||
      typeof expectedUpdatedAt !== 'string' || !Number.isFinite(Date.parse(expectedUpdatedAt))) {
    return res.status(400).json({ error: 'Provide a valid status, timestamp, and note of at most 1000 characters.' })
  }
  try {
    const result = await new ProposalService().AdminUpdateStatus({
      Id: req.query.id, actorId: req.user._id, status, note: note.trim(), expectedUpdatedAt
    })
    if (result.error) return res.status(result.code || 400).json({ error: result.error })
    return res.status(200).json({ message: 'Status updated.' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Could not update proposal status. Refresh to check its current status before retrying.' })
  }
})
export default handler