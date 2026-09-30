import ExpectationService from '@/services/expectation-service'
import { isAuth } from '@/utils'
import resolveProfileUpdateTarget from '@/utility/resolve-profile-update-target'
import nextConnect from 'next-connect'

const handler = nextConnect()

handler.get(async (req, res) => {
  try {
    const service = new ExpectationService()
    const userId = req.query.id
    const user = await service.FindExpectationByUserId(userId)
    res.status(200).json(user)
  } catch (error) {
    res.status(400)
  }
})

handler.use(isAuth)
handler.put(async (req, res) => {
  try {
    const service = new ExpectationService()
    const id = await resolveProfileUpdateTarget(req, res, req.query.id)
    if (!id) return

    const user = await service.UpdateExpectation(id, req.body)
    res.status(200).json(user)
  } catch (error) {
    res.status(400)
  }
})

export default handler
