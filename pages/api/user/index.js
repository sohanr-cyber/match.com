import UserService from '@/services/user-service'
import { isAuth } from '@/utils'
import nextConnect from 'next-connect'

const handler = nextConnect()

handler.post(async (req, res) => {
  try {
    const service = new UserService()
    const { sender, reciever } = req.body

    const user = await service.UpdateUserProposal(sender, reciever)
    res.status(200).json(user)
  } catch (error) {
    console.log(error)
    res.status(400)
  }
})

handler.use(isAuth)
handler.put(async (req, res) => {
  try {
    const { savedId } = req.body
    const saverId = req.user._id
    const service = new UserService()

    const result = await service.UpdateSavedUser({ savedId, saverId })
    res.status(200).json(result)
  } catch (error) {
    console.log(error)
  }
})

handler.get(async (req, res) => {
  try {
    const UserId = req.user._id
    const service = new UserService()
    const result = await service.RetrieveSavedUsers(UserId)
    console.log({ result })
    res.status(200).json(result)
  } catch (error) {
    console.log(error)
  }
})

export default handler
