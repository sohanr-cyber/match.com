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

const handler = nextConnect()

handler.post(async (req, res) => {
  try {
    await db.connect()

    for (let i = 0; i < 1500; i++) {
      const dummyUser = {
        name: faker.random.arrayElement(names),
        email: faker.internet.email(),
        password: faker.internet.password(),
        city: faker.random.arrayElement(cities),
        district: faker.random.arrayElement(districts),
        upazilla: faker.random.arrayElement(upazillas),
        educationType: faker.random.arrayElement(educationTypes),
        education: faker.random.arrayElement(educationalStatus),
        institute: faker.random.arrayElement(institutes),
        bodyType: faker.random.arrayElement(bodyTypes),
        skinColor: faker.random.arrayElement(skinColors),
        gender: faker.random.arrayElement(['Male', 'Female']),
        status: faker.random.arrayElement(marriageStatus),
        profession: faker.random.arrayElement(professions),
        bornAt: new Date(faker.random.arrayElement(datesOfBirth)),
        session: faker.random.arrayElement(sessions),
        maritalStatus: faker.random.arrayElement(maritalStatuses),
        approved: true,
        impression: faker.random.number({ min: 0, max: 5000 }),
        averageMonthlyIncome: faker.random.number({ min: 20000, max: 80000 }),
        height: faker.random.arrayElement(
          heights.map(i => i.feet * 12 + i.inches)
        ),

        categories: categories
      }

      console.log({ dummyUser })
      const newUser = await new User(dummyUser)
      await newUser.save()
      await Address.create({ user: newUser._id })
      await Education.create({ user: newUser._id })
      await Family.create({ user: newUser._id })
      await Personal.create({ user: newUser._id })
      await Physical.create({ user: newUser._id })
      await Religion.create({ user: newUser._id })
      await Expectation.create({ user: newUser._id })
    }

    const users = await User.find({})
    res.status(200).send({ users })
  } catch (error) {
    console.log(error)
    res.status(400)
  }
})

handler.get(async (req, res) => {
  try {
    await db.connect()
    const users = await User.find({}).lean()
    res.status(200).json(users)
  } catch (error) {
    res.status(400)
  }
})
export default handler
