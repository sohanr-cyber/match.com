import nextConnect from 'next-connect'
import { isAuth } from '@/utils'
import ProposalService from '@/services/proposal-service'

const handler = nextConnect({ onNoMatch: (req, res) => res.status(405).json({ error: 'Method not allowed.' }) })
handler.use(isAuth)
handler.get(async (req, res) => {
  const { id } = req.query
  if (typeof id !== 'string' || !/^[a-f\d]{24}$/i.test(id)) {
    return res.status(400).json({ error: 'Invalid proposal ID.' })
  }
  try {
    const proposal = await new ProposalService().FindProposalByIdForUser(id, req.user._id)
    if (!proposal) return res.status(404).json({ error: 'Proposal not found.' })
    return res.status(200).json({ proposal })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Could not load proposal details.' })
  }
})

export default handler
