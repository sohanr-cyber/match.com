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
  heights,
  bodyTypes,
  sessions,
  educationTypes,
  maritalStatuses,
  educationalStatus
} from './data'

const handler = nextConnect()

handler.get(async (req, res) => {
  try {
    await db.connect()
    const users = await User.find({}).limit(5).lean()
    res.status(200).json(users)
  } catch (error) {
    res.status(400)
  }
})

export default handler
