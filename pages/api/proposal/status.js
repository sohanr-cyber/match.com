import ProposalService from '@/services/proposal-service'
import { isAuth } from '@/utils'
import nextConnect from 'next-connect'

const handler = nextConnect()

// poke
handler.post(async (req, res) => {
  try {
    const service = new ProposalService()
    const { sender, message, Id } = req.body

    const data = await service.Pock({ sender, Id, message })
    console.log({ data })
    res.status(200).json(data)
  } catch (error) {
    console.log(error)
    res.status(400)
  }
})

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

// Decline Proposal
handler.use(isAuth)
handler.put(async (req, res) => {
  try {
    const { Id, sender, reciever } = req.body
    const service = new ProposalService()

    const user = await service.DeclineProposal({
      Id: Id,
      status: 'Declined'
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
