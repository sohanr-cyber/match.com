import ExpectationService from '@/services/expectation-service'
import nextConnect from 'next-connect'

const handler = nextConnect()

handler.get(async (req, res) => {
  try {
    const service = new ExpectationService()
    const userId = req.query.id
    const { data: user } = await service.FindExpectationByUserId(userId)
    res.status(200).json(user)
  } catch (error) {
    res.status(400)
  }
})

handler.put(async (req, res) => {
  try {
    const service = new ExpectationService()
    const id = req.query.id

    const { data: user } = await service.UpdateExpectation(id, req.body)
    res.status(200).json(user)
  } catch (error) {
    res.status(400)
  }
})

export default handler
