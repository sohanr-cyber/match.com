import nextConnect from 'next-connect'
import User from '@/database/model/User'
import faker from 'faker'
import db from '@/database/connection'
import {
  institutes,
  districts,
  cities,
  names,
  professions,
  marriageStatus,
  averageMonthlyIncomes,
  datesOfBirth,
  upazillas,
  skinColors,
  bodyTypes,
  sessions
} from './data'
import UserService from '@/services/user-service'

const handler = nextConnect()
handler.get(async (req, res) => {
  try {
    console.log('runnign')
    await db.connect()
    const service = new UserService()
    const user = await service.FindUserProfileById(req.query.id)

    return res.status(200).send(user)
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' })
  }
})

export default handler
