import AddressService from '@/services/address-service'
import { isAuth } from '@/utils'
import nextConnect from 'next-connect'

const handler = nextConnect()

handler.use(isAuth)
handler.get(async (req, res) => {
  try {
    const service = new AddressService()
    const userId = req.query.id
    const data = await service.FindAddressByUserId(userId)
    res.status(200).json(data)
  } catch (error) {
    res.status(400)
  }
})

handler.put(async (req, res) => {
  try {
    const service = new AddressService()
    const id = req.user._id

    const data = await service.UpdateAddress(id, req.body)
    res.status(200).json(data)
  } catch (error) {
    res.status(400)
  }
})

export default handler
