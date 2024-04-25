import nextConnect from 'next-connect'
import User from '@/database/model/User'
import Address from '@/database/model/Address'
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
  educationalStatus,
  categories
} from './data'
import Education from '@/database/model/Education'
import Personal from '@/database/model/Personal'
import Physical from '@/database/model/Physical'
import Religion from '@/database/model/Religion'
import Expectation from '@/database/model/Expectation'
import Family from '@/database/model/Family'
import UserRepository from '@/database/repository/user-repository'
const handler = nextConnect()
const repo = new UserRepository()

handler.get(async (req, res) => {
  try {
    await db.connect()
    const users = await User.find({})
    const updated = await Promise.all(
      users.slice(0, 10).map(async i => {
        const profileId = await repo.generateId()
        const newUser = User.findOneAndUpdate(
          { _id: i._id },
          {
            profileId
          },
          {
            new: true
          }
        )
        return newUser
      })
    )

    res.status(200).json(updated)
  } catch (error) {
    res.status(400)
  }
})

export default handler
