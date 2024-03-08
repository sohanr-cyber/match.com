import ProposalService from '@/services/proposal-service'
import { isAuth } from '@/utils'
import nextConnect from 'next-connect'

const handler = nextConnect()

// create proposals
handler.use(isAuth)
handler.post(async (req, res) => {
  try {
    const service = new ProposalService()
    const { sender, reciever, message } = req.body
    const user = await service.CreateProposal({ sender, reciever, message })
    res.status(200).json(user)
  } catch (error) {
    console.log(error)
    res.status(400)
  }
})

// retrieve proposals
handler.get(async (req, res) => {
  try {
    const service = new ProposalService()
    const { userId } = req.query

    const user = await service.FindProposalsByUserId(userId)
    res.status(200).json(user)
  } catch (error) {
    console.log(error)
    res.status(400)
  }
})

// Accept Proposal
handler.put(async (req, res) => {
  try {
    const { Id, acceptor, sender } = req.body
    const service = new ProposalService()

    const user = await service.UpdateProposal({
      Id: req.body.Id,
      acceptor,
      sender,
      status: 'Accepted'
    })
    res.status(200).json(user)
  } catch (error) {
    console.log(error)
  }
})

// withdraw proposal
handler.patch(async (req, res) => {
  try {
    const { Id, reciever, sender } = req.body
    const service = new ProposalService()

    const user = await service.WithdrawUserProposal({
      Id,
      reciever,
      sender,
      status: 'Withdrawn'
    })
    res.status(200).json(user)
  } catch (error) {
    console.log(error)
  }
})

export default handler
