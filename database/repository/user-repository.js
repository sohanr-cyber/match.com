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
  async CreateUser ({ email, password, name, salt }) {
    try {
      await db.connect()
      const user = new User({
        email,
        password,
        salt,
        name
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
        user: userResult._id
      })

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

  async FindUserProfileById (userId) {
    try {
      await db.connect()
      const existingUser = await User.findOne(
        { _id: userId },
        {
          password: 0,
          salt: 0
        }
      )
      const family = await this.family.FindFamilyByUserId(userId)
      const address = await this.address.FindAddressByUserId(userId)
      const religion = await this.religion.FindReligionByUserId(userId)
      const physical = await this.physical.FindPhysicalByUserId(userId)
      const education = await this.education.FindEducationByUserId(userId)
      const expectation = await this.expectation.FindExpectationByUserId(userId)
      const personal = await this.personal.FindPersonalByUserId(userId)

      // console.log({
      //   existingUser,
      //   family,
      //   address,
      //   religion,
      //   physical,
      //   education,
      //   expectation,
      //   personal
      // })
      await db.disconnect()

      return {
        existingUser,
        family,
        address,
        religion,
        physical,
        education,
        expectation,
        personal
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
          select: '_id height profession'
        })

      return user
    } catch (error) {
      console.log(error)
    }
  }

  async DeleteUserById (id) {
    try {
      await db.connect()
      const deletedUser = await User.findByIdAndRemove({ _id: id })
      return deletedUser
    } catch (error) {
      console.log(error)
    }
  }
}

export default UserRepository
