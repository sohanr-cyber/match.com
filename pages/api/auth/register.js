import UserService from '@/services/user-service'
import { isAuth } from '@/utils'
import resolveProfileUpdateTarget from '@/utility/resolve-profile-update-target'
import nextConnect from 'next-connect'

const handler = nextConnect()

handler.post(async (req, res) => {
  try {
    const service = new UserService()
    const { phone, password, name, gender } = req.body
    const user = await service.SignUp({ phone, password, name, gender })
    return res.status(200).json(user)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Could not create account.' })
  }
})

handler.use(isAuth)
handler.put(async (req, res) => {
  try {
    const service = new UserService()
    const targetId = await resolveProfileUpdateTarget(req, res, req.body.targetUserId || req.user._id)
    if (!targetId) return
    const { targetUserId, ...changes } = req.body
    const user = await service.UpdateUser({ ...changes, _id: targetId })
    return res.status(200).json(user)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Could not update account.' })
  }
})

export default handler
