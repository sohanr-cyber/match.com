import EducationService from '@/services/education-service'
import nextConnect from 'next-connect'

const handler = nextConnect()

handler.get(async (req, res) => {
  try {
    const service = new EducationService()
    const userId = req.query.id
    const { data: user } = await service.FindEducationByUserId(userId)
    res.status(200).json(user)
  } catch (error) {
    res.status(400)
  }
})

handler.put(async (req, res) => {
  try {
    const service = new EducationService()
    const id = req.query.id

    const { data: user } = await service.UpdateEducation(id, req.body)
    res.status(200).json(user)
  } catch (error) {
    res.status(400)
  }
})

export default handler
