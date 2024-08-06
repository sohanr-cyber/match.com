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
import { isAuth, isAuthOptional } from '@/utils'
import Family from '@/database/model/Family'
import Address from '@/database/model/Address'
import Religion from '@/database/model/Religion'
import Physical from '@/database/model/Physical'
import Education from '@/database/model/Education'
import Expectation from '@/database/model/Expectation'
import { isValidObjectId } from '@/utility/helper'

function hideSensitiveInformation (userObject, reqUserId) {
  // Clone the existing user object to avoid modifying the original
  const newUserObject = JSON.parse(JSON.stringify(userObject))

  if (
    newUserObject.existingUser.proposalSent?.find(i => reqUserId) ||
    newUserObject.existingUser.proposalRecieved?.find(i => reqUserId) ||
    newUserObject.existingUser.proposalAccepted?.find(i => reqUserId) ||
    newUserObject.existingUser._id == reqUserId
  ) {
    return newUserObject
  }
  // Hide sensitive information in 'existingUser'
  newUserObject.existingUser.name = '*****'
  newUserObject.existingUser.email = '*****'
  // newUserObject.existingUser.savedIds = "*****";
  // newUserObject.existingUser.saverIds = "*****";

  // Hide sensitive information in 'personal'

  newUserObject.address.phone = '*****'
  newUserObject.address.email = '*****'
  newUserObject.address.location = '*****'
  newUserObject.address.phone2 = '*****'

  return newUserObject
}

const handler = nextConnect()
handler.use(isAuthOptional)
handler.get(async (req, res) => {
  try {
    await db.connect()
    // const service = new UserService()
    const update = req.query.update

    // const user = await service.FindUserProfileById(
    //   req.query.id,
    //   req.user?._id,
    //   update
    // )

    let existingUser
    let userId = req.query.id
    const reqUserId = req.user._id
    if (isValidObjectId(userId)) {
      existingUser = await User.findOne(
        { _id: userId }, // Wrap conditions in an array
        { password: 0, salt: 0 }
      )
    } else {
      existingUser = await User.findOne(
        { profileId: userId }, // Wrap conditions in an array
        { password: 0, salt: 0 }
      )
    }

    userId = existingUser._id

    let family = {}
    let address = {}
    let religion = {}

    let physical = {}
    let education = {}
    let expectation = {}
    // let personal = {}

    switch (update) {
      case 'basic':
        break
      case 'family':
        family = await Family.findOne({ user: userId })
        break
      case 'address':
        address = await Address.findOne({ user: userId })
        break
      case 'religion':
        religion = await Religion.findOne({ user: userId })
        break

      case 'physical':
        physical = await Physical.findOne({ user: userId })
        break

      case 'education':
        education = await Education.findOne({ user: userId })
        break
      case 'expectation':
        expectation = await Expectation.findOne({ user: userId })
        break
      default:
        family = await Family.findOne({ user: userId })
        address = await Address.findOne({ user: userId })
        religion = await Religion.findOne({ user: userId })
        physical = await Physical.findOne({ user: userId })
        education = await Education.findOne({ user: userId })
        expectation = await Expectation.findOne({ user: userId })
    }

    existingUser.click += 1
    await existingUser.save()
    await db.disconnect()

    return res.status(200).send(
      hideSensitiveInformation(
        {
          existingUser,
          family,
          address,
          religion,
          physical,
          education,
          expectation
        },
        reqUserId
      )
    )
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
})

export default handler
