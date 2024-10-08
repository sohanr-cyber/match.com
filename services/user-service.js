import UserRepository from '@/database/repository/user-repository'
import { generateVerificationCode } from '@/utility/helper'

import {
  GenerateSalt,
  GeneratePassword,
  ValidatePassword,
  GenerateSignature,
  ValidateSignature,
  FormateData
} from '@/utility/index'
import Notification from './notification-service'

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

class UserService {
  constructor () {
    this.repository = new UserRepository()
    this.notification = new Notification()
  }

  async SignUp (userInputs) {
    const { email, password, name, gender } = userInputs

    // Check if user already exists
    const existingUser = await this.repository.FindUser({ email })
    if (existingUser) {
      return FormateData({ error: 'Email Already Exist!' })
    }

    // Run independent operations concurrently
    const [salt, profileId] = await Promise.all([
      GenerateSalt(),
      this.repository.generateId()
    ])
    const userPassword = await GeneratePassword(password, salt)
    const verificationCode = generateVerificationCode(6)

    const expirationTime = new Date()
    expirationTime.setMinutes(expirationTime.getMinutes() + 5)

    // Create user
    const existUser = await this.repository.CreateUser({
      email,
      password: userPassword,
      name,
      salt,
      gender,
      verificationCode,
      expirationTime,
      profileId
    })

    if (existUser) {
      // Sending email doesn't need to block the next steps
      this.notification.sendCodeToMail({
        recieverEmail: existUser.email,
        recieverName: existUser.name,
        recieverId: existUser._id,
        verificationCode: existUser.verificationCode
      })
    }

    // Generate token
    const token = await GenerateSignature({
      email: email,
      _id: existUser._id,
      isVerified: existUser.isVerified
    })

    return FormateData({
      id: existUser._id,
      token,
      name: existUser.name,
      active: existUser.active,
      isVerified: existUser.isVerified,
      profileId: existUser.profileId
    })
  }

  async SignIn (userInputs) {
    try {
      console.log(userInputs)
      const { email, password } = userInputs
      const existingUser = await this.repository.FindUser({ email })
      if (!existingUser) {
        return FormateData({ error: 'User Not Found With This Gmail !' })
      }
      if (existingUser) {
        const validPassword = await ValidatePassword(
          password.toString(),
          existingUser.password,
          existingUser.salt
        )
        if (validPassword) {
          const token = await GenerateSignature({
            email: existingUser.email,
            _id: existingUser._id,
            isVerified: existingUser.isVerified
          })
          return FormateData({
            id: existingUser._id,
            token,
            name: existingUser.name,
            active: existingUser.active,
            isVerified: existingUser.isVerified,
            profileId: existingUser.profileId
          })
        } else {
          return FormateData({ error: "Password Didn't Match !" })
        }
      }

      return FormateData({ error: 'User Not Found' })
    } catch (error) {
      console.log(error)
    }
  }

  async FindUserProfileById (userId, reqUserId, update) {
    // console.log({ userId, reqUserId })
    const existingUser = await this.repository.FindUserProfileById(
      userId,
      update
    )
    return hideSensitiveInformation(existingUser, reqUserId)
  }

  async UpdateUser (userInputs) {
    try {
      const { email, password, ...DataToUpdate } = userInputs
      const existingUser = await this.repository.UpdateUser(DataToUpdate)
      return FormateData(existingUser)
    } catch (error) {
      console.log(error)
    }
  }
  async UpdateUserProposal ({ sender, reciever }) {
    const existingUser = await this.repository.UpdateUserProposal({
      sender,
      reciever
    })
    return FormateData(existingUser)
  }
  async AcceptUserProposal ({ sender, acceptor }) {
    const existingUser = await this.repository.AcceptUserProposal({
      sender,
      acceptor
    })
    return FormateData(existingUser)
  }

  async DeclineUserProposal ({ sender, acceptor }) {
    const existingUser = await this.repository.AcceptUserProposal({
      sender,
      acceptor
    })
    return FormateData(existingUser)
  }

  async WithdrawUserProposal ({ sender, reciever }) {
    const existingUsers = await this.repository.WithdrawUserProposal({
      sender,
      reciever
    })
    return FormateData(existingUsers)
  }
  async UpdateSavedUser (UserInput) {
    const { saverId, savedId } = UserInput
    const result = await this.repository.UpdateSavedUser(saverId, savedId)
    return result
  }

  async RetrieveSavedUsers (UserId) {
    const result = await this.repository.RetrieveSavedUsers(UserId)
    return result
  }
  async DeleteUserById (userId) {
    const result = await this.repository.DeleteUserById(userId)
    return result
  }
}

export default UserService
