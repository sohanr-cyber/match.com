import ProposalService from '@/services/proposal-service'
import { isAuth } from '@/utils'
import nextConnect from 'next-connect'

const handler = nextConnect()
handler.use(isAuth)

handler.get(async (req, res) => {
  try {
    const proposals = await new ProposalService().FindProposalsByUserId(req.user._id)
    return res.status(200).json(proposals)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Could not load proposals.' })
  }
})

handler.post(async (req, res) => {
  try {
    const proposal = await new ProposalService().CreateProposal({
      sender: req.user._id,
      reciever: req.body.reciever,
      message: req.body.message
    })
    return res.status(200).json(proposal)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Could not send proposal.' })
  }
})

handler.put(async (req, res) => {
  try {
    const proposal = await new ProposalService().UpdateProposal({ Id: req.body.Id, actorId: req.user._id })
    return res.status(200).json(proposal)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Could not accept proposal.' })
  }
})

handler.patch(async (req, res) => {
  try {
    const proposal = await new ProposalService().WithdrawUserProposal({ Id: req.body.Id, actorId: req.user._id })
    return res.status(200).json(proposal)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Could not withdraw proposal.' })
  }
})

export default handler
