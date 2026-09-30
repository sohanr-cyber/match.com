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
import Message from './message-service'
import { normalizePhone } from '@/utility/phone'
import db from '@/database/connection'
import User from '@/database/model/User'

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
  newUserObject.existingUser.phone = '*****'
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
    this.message = new Message()
  }

  async SignUp (userInputs) {
    const { password, name, gender } = userInputs
    const phone = normalizePhone(userInputs.phone)
    if (!phone || !password || !name || !['Male', 'Female'].includes(gender)) {
      return FormateData({ error: 'Enter a valid Bangladeshi phone number and complete all fields.' })
    }
    if (!process.env.BULK_SMS_API_KEY || !process.env.BULK_SMS_SENDER_ID) {
      return FormateData({ error: 'SMS service is not configured.' })
    }

    const existingUser = await this.repository.FindUser({ phone })
    if (existingUser) {
      return FormateData({ error: 'Phone number already registered.' })
    }

    const [salt, profileId] = await Promise.all([
      GenerateSalt(),
      this.repository.generateId()
    ])
    const userPassword = await GeneratePassword(password, salt)
    const verificationCode = generateVerificationCode(6)
    const expirationTime = new Date(Date.now() + 5 * 60 * 1000)

    const existUser = await this.repository.CreateUser({
      phone,
      password: userPassword,
      name,
      salt,
      gender,
      verificationCode,
      expirationTime,
      profileId
    })

    let smsSent = true
    try {
      await this.message.sendMessage({
        number: phone,
        message: 'Your Muslim Match Maker verification code is ' + verificationCode + '. It expires in 5 minutes.'
      })
    } catch (error) {
      smsSent = false
      existUser.lastVerificationSentAt = undefined
      await existUser.save()
      console.error('Could not send registration SMS:', error.message)
    }

    const token = await GenerateSignature({
      phone,
      _id: existUser._id,
      isVerified: existUser.isVerified
    })

    return FormateData({
      id: existUser._id,
      token,
      phone,
      name: existUser.name,
      active: existUser.active,
      isVerified: existUser.isVerified,
      profileId: existUser.profileId,
      role: existUser.role,
      smsSent
    })
  }

  async SignIn (userInputs) {
    const phone = normalizePhone(userInputs.phone)
    const email = typeof userInputs.email === 'string'
      ? userInputs.email.trim().toLowerCase()
      : ''
    const { password } = userInputs
    const legacyEmail = !phone && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    if ((!phone && !legacyEmail) || !password) {
      return FormateData({ error: 'Enter a valid phone number or legacy email and password.' })
    }

    const existingUser = phone
      ? await this.repository.FindUser({ phone })
      : await this.repository.FindLegacyUserByEmail(email)
    if (!existingUser) {
      return FormateData({ error: 'Invalid credentials.' })
    }
    const validPassword = await ValidatePassword(
      password.toString(),
      existingUser.password,
      existingUser.salt
    )
    if (!validPassword) {
      return FormateData({ error: 'Invalid credentials.' })
    }

    const token = await GenerateSignature({
      ...(legacyEmail ? { email: existingUser.email } : { phone: existingUser.phone }),
      _id: existingUser._id,
      isVerified: existingUser.isVerified
    })
    return FormateData({
      id: existingUser._id,
      token,
      phone: existingUser.phone,
      name: existingUser.name,
      active: existingUser.active,
      isVerified: existingUser.isVerified,
      profileId: existingUser.profileId,
      role: existingUser.role,
      legacyEmail
    })
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
    const allowedFields = [
      'name', 'gender', 'maritalStatus', 'city', 'district', 'upazilla',
      'educationType', 'education', 'institute', 'session', 'profession',
      'height', 'skinColor', 'bodyType', 'bornAt', 'averageMonthlyIncome',
      'categories', 'active'
    ]
    const changes = { _id: userInputs._id }
    for (const field of allowedFields) {
      if (Object.prototype.hasOwnProperty.call(userInputs, field)) {
        changes[field] = userInputs[field]
      }
    }
    if (changes.active === true) {
      await db.connect()
      const account = await User.findById(userInputs._id).select('isVerified').lean()
      if (!account?.isVerified) throw new Error('Verify the account before activating the profile')
    }
    const existingUser = await this.repository.UpdateUser(changes)
    if (!existingUser) throw new Error('Account update failed')
    const safe = existingUser.toObject()
    for (const field of ['password', 'salt', 'verificationCode', 'verificationAttempts', 'expirationTime', 'lastVerificationSentAt', 'phone']) {
      delete safe[field]
    }
    return FormateData(safe)
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
