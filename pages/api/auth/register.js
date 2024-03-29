import UserService from '@/services/user-service'
import { isAuth } from '@/utils'
import nextConnect from 'next-connect'

const handler = nextConnect()

handler.post(async (req, res) => {
  try {
    const service = new UserService()
    const { email, password, name, gender } = req.body
    const user = await service.SignUp({ email, password, name, gender })
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
    console.log(user)
    res.status(200).json(user)
  } catch (error) {
    console.log(error)
  }
})

export default handler
