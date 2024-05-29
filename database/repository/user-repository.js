import { isValidObjectId } from '@/utility/helper'
import db from '../connection'
import User from '../model/User'
import AddressRepository from './address-repository'
import EducationRepository from './education-repository'
import ExpectationRepository from './expectation-repository'
import FamilyRepository from './family-repository'
import PersonalRepository from './personal-repository'
import PhysicalRepository from './physical-repository'
import ReligionRepository from './religion-repository'

class UserRepository {
  constructor () {
    this.personal = new PersonalRepository()
    this.family = new FamilyRepository()
    this.address = new AddressRepository()
    this.religion = new ReligionRepository()
    this.physical = new PhysicalRepository()
    this.education = new EducationRepository()
    this.expectation = new ExpectationRepository()
  }
  async CreateUser ({
    email,
    password,
    name,
    salt,
    gender,
    verificationCode,
    expirationTime,
    profileId
  }) {
    try {
      await db.connect()
      const user = new User({
        email,
        password,
        salt,
        name,
        gender,
        verificationCode,
        expirationTime,
        profileId
      })

      const userResult = await user.save()

      const family = await this.family.CreateFamily({
        user: userResult._id
      })
      const address = await this.address.CreateAddress({
        user: userResult._id
      })
      const religion = await this.religion.CreateReligion({
        user: userResult._id
      })
      const physical = await this.physical.CreatePhysical({
        user: userResult._id
      })
      const education = await this.education.CreateEducation({
        user: userResult._id
      })
      const expectation = await this.expectation.CreateExpectation({
        user: userResult._id
      })
      const personal = await this.personal.CreatePersonal({
        user: userResult._id,
        gender: userResult.gender
      })

      await db.disconnect()
      return userResult
    } catch (error) {
      console.log(error)
    }
  }

  async FindUser ({ email }) {
    try {
      await db.connect()
      const existingCustomer = await User.findOne({ email: email })
      return existingCustomer
    } catch (error) {
      console.log(error)
    }
  }

  async generateId () {
    try {
      await db.connect()
      let id
      do {
        id = Math.floor(100000 + Math.random() * 900000)
      } while (await User.findOne({ profileId: id })) // Check if the number is already in use

      // Add the new ID to the existing list
      console.log({ id })
      return id
    } catch (error) {
      console.log(error)
    }
  }

  async FindUserProfileById (userId, update) {
    try {
      await db.connect()
      let existingUser

      // console.log({ userId, update })

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
          family = await this.family.FindFamilyByUserId(userId)
          break
        case 'address':
          address = await this.address.FindAddressByUserId(userId)
          break
        case 'religion':
          religion = await this.religion.FindReligionByUserId(userId)
          break

        case 'physical':
          physical = await this.physical.FindPhysicalByUserId(userId)
          break

        case 'education':
          education = await this.education.FindEducationByUserId(userId)
          break
        case 'expectation':
          expectation = await this.expectation.FindExpectationByUserId(userId)
          break
        default:
          family = await this.family.FindFamilyByUserId(userId)
          address = await this.address.FindAddressByUserId(userId)
          religion = await this.religion.FindReligionByUserId(userId)
          physical = await this.physical.FindPhysicalByUserId(userId)
          education = await this.education.FindEducationByUserId(userId)
          expectation = await this.expectation.FindExpectationByUserId(userId)
      }

      existingUser.click += 1
      await existingUser.save()
      await db.disconnect()

      return {
        existingUser,
        family,
        address,
        religion,
        physical,
        education,
        expectation
        // personal
      }
    } catch (error) {
      console.log(error)
    }
  }

  async UpdateUser (dataToUpdate) {
    try {
      await db.connect()
      const existingUser = await User.findOneAndUpdate(
        { _id: dataToUpdate._id },
        { ...dataToUpdate },
        { new: true }
      )
      await db.disconnect()
      return existingUser
    } catch (error) {
      console.log(error)
    }
  }

  // request from saverId to savedId
  // saverId(req.user._id) = who have saved this profile Id
  // savedId = what i have saved (profile user goonaa save)
  async UpdateSavedUser (saverId, savedId) {
    try {
      await db.connect()

      // Update the savedUser
      const staredUser = await User.findOne({ _id: savedId })
      if (!staredUser.saverIds?.includes(saverId)) {
        staredUser.saverIds?.push(saverId)
        await staredUser.save()
      } else {
        staredUser.saverIds?.pull(saverId)
        await staredUser.save()
      }

      // Update the requesting user
      const reqUser = await User.findOne({ _id: saverId })
      if (!reqUser.savedIds?.includes(savedId)) {
        reqUser.savedIds?.push(savedId)
        await reqUser.save()
      } else {
        reqUser.savedIds?.pull(savedId)
        await reqUser.save()
      }
      await db.disconnect()

      return {
        reqUser: { saverIds: reqUser.saverIds, savedIds: reqUser.savedIds },
        staredUser: {
          saverIds: staredUser.saverIds,
          savedIds: staredUser.savedIds
        }
      }
    } catch (error) {
      console.error(error)
      // You might want to throw the error or handle it appropriately
      throw error
    }
  }

  // sending - recieving proposal
  async UpdateUserProposal ({ sender, reciever }) {
    try {
      await db.connect()
      const senderUpdated = await User.findOneAndUpdate(
        { _id: sender },
        { $push: { proposalSent: reciever } },
        { new: true }
      )

      const recieverUpdated = await User.findOneAndUpdate(
        { _id: reciever },
        { $push: { proposalRecieved: sender } },
        { new: true }
      )
      await db.disconnect()
      return { senderUpdated, recieverUpdated }
    } catch (error) {
      console.log(error)
    }
  }

  async AcceptUserProposal ({ acceptor, sender }) {
    try {
      await db.connect()
      const updated = await User.findOneAndUpdate(
        { _id: acceptor },
        { $push: { proposalAccepted: sender } },
        { new: true }
      )
      await db.disconnect()
      console.log({ updated })
      return updated
    } catch (error) {
      console.log(error)
    }
  }

  async DeclineUserProposal ({ acceptor, sender }) {
    try {
      await db.connect()
      const updated = await User.findOneAndUpdate(
        { _id: acceptor },
        { $pull: { proposalAccepted: sender } },
        { new: true }
      )
      await db.disconnect()
      console.log({ updated })
      return updated
    } catch (error) {
      console.log(error)
    }
  }

  async WithdrawUserProposal ({ reciever, sender }) {
    try {
      await db.connect()
      const updatedSender = await User.findOneAndUpdate(
        { _id: sender },
        { $pull: { proposalSent: reciever } },
        { new: true }
      )

      const updatedReciever = await User.findOneAndUpdate(
        {
          _id: reciever
        },
        {
          $pull: {
            proposalRecieved: sender
          }
        },
        {
          new: true
        }
      )
      console.log({
        updatedReciever,
        updatedSender
      })
      await db.disconnect()
      return {
        updatedReciever,
        updatedSender
      }
    } catch (error) {
      console.log(error)
    }
  }

  async RetrieveSavedUsers (UserId) {
    try {
      await db.connect()
      const user = await User.findOne({ _id: UserId })
        .select('savedIds')
        .populate({
          path: 'savedIds',
          select: '_id height profession saverIds'
        })

      await db.disconnect()

      return user
    } catch (error) {
      console.log(error)
    }
  }

  async DeleteUserById (id) {
    try {
      await db.connect()
      const deletedUser = await User.deleteOne({ _id: id })
      const deletedFamily = await this.family.DeleteFamilyById(id)
      const deletedEducation = await this.education.DeleteEducationById(id)
      const deletedAddress = await this.address.DeleteAddressById(id)
      const deletedReligion = await this.religion.DeleteReligionById(id)
      const deletedPhysical = await this.physical.DeletePhysicalById(id)
      const deletedExpectation = await this.expectation.DeleteExpectationById(
        id
      )

      await db.disconnect()

      return deletedUser
    } catch (error) {
      console.log(error)
    }
  }
}

export default UserRepository
