import ProposalService from '@/services/proposal-service'
import { isAuth } from '@/utils'
import nextConnect from 'next-connect'

const handler = nextConnect()
handler.use(isAuth)

handler.post(async (req, res) => {
  try {
    const result = await new ProposalService().Pock({ Id: req.body.Id, actorId: req.user._id })
    return res.status(200).json(result)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Could not send reminder.' })
  }
})

handler.put(async (req, res) => {
  try {
    const result = await new ProposalService().DeclineProposal({ Id: req.body.Id, actorId: req.user._id })
    return res.status(200).json(result)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Could not decline proposal.' })
  }
})

export default handler
