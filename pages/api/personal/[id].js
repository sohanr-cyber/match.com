import PersonalService from '@/services/personal-service'
import UserService from '@/services/user-service'
import { isAuth } from '@/utils'
import nextConnect from 'next-connect'

const handler = nextConnect()

handler.get(async (req, res) => {
  try {
    const service = new PersonalService()
    const userId = req.query.id
    const { data: user } = await service.FindPersonalByUserId(userId)
    res.status(200).json(user)
  } catch (error) {
    res.status(400)
  }
})

handler.use(isAuth)
handler.put(async (req, res) => {
  try {
    const service = new PersonalService()
    const id = req.user._id
    const user = await service.UpdatePersonal(id, req.body)
    res.status(200).json(user)
  } catch (error) {
    res.status(400)
  }
})

export default handler
