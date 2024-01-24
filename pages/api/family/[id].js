import FamilyService from '@/services/family-service'
import { isAuth } from '@/utils'
import nextConnect from 'next-connect'

const handler = nextConnect()

handler.get(async (req, res) => {
  try {
    const service = new FamilyService()
    const userId = req.query.id
    const { data: user } = await service.FindFamilyByUserId(userId)
    res.status(200).json(user)
  } catch (error) {
    res.status(400)
  }
})

handler.use(isAuth)
handler.put(async (req, res) => {
  try {
    const service = new FamilyService()
    const id = req.query.id
   

    const user = await service.UpdateFamily(id, req.body)
    res.status(200).json(user)
  } catch (error) {
    res.status(400)
  }
})

export default handler
