import UserService from '@/services/user-service'
import nextConnect from 'next-connect'

const handler = nextConnect()

handler.post(async (req, res) => {
  try {
    const service = new UserService()
    const { phone, email, password } = req.body
    const user = await service.SignIn({ phone, email, password })
    return res.status(200).json(user)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Could not sign in.' })
  }
})

export default handler
