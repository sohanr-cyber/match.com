import ReligionService from '@/services/religion-service'
import UserService from '@/services/user-service'
import nextConnect from 'next-connect'

const handler = nextConnect()

handler.get(async (req, res) => {
  try {
    const service = new ReligionService()
    const userId = req.query.id
    const { data: user } = await service.FindReligionByUserId(userId)
    res.status(200).json(user)
  } catch (error) {
    res.status(400)
  }
})

handler.put(async (req, res) => {
  try {
    const service = new ReligionService()
    const id = req.query.id

    const user= await service.UpdateReligion(id, req.body)
    res.status(200).json(user)
  } catch (error) {
    res.status(400)
  }
})

export default handler
