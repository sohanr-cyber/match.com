import ProposalService from '@/services/proposal-service'
import { isAuth } from '@/utils'
import nextConnect from 'next-connect'

const handler = nextConnect()

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

handler.use(isAuth)
handler.put(async (req, res) => {
  try {
    const service = new UserService()

    const user = await service.UpdateUser({
      ...req.body,
      _id: req.user._id
    })
    res.status(200).json(user)
  } catch (error) {
    console.log(error)
  }
})

export default handler
