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
      const existingUser = await User.findOne({ _id: userId })
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
