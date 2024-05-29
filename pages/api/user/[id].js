import UserService from '@/services/user-service'
import { isAuth } from '@/utils'
import nextConnect from 'next-connect'

const handler = nextConnect()

// handler.use(isAuth)

handler.delete(async (req, res) => {
  try {
    const UserId = req.query.id
    const service = new UserService()
    const result = await service.DeleteUserById(UserId)
    console.log({ result })
    res.status(200).json(result)
  } catch (error) {
    console.log(error)
  }
})

export default handler
