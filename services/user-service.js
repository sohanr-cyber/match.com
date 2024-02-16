import UserRepository from '@/database/repository/user-repository'

import {
  GenerateSalt,
  GeneratePassword,
  ValidatePassword,
  GenerateSignature,
  ValidateSignature,
  FormateData
} from '@/utility/index'

function hideSensitiveInformation (userObject, reqUserId) {
  // Clone the existing user object to avoid modifying the original
  const newUserObject = JSON.parse(JSON.stringify(userObject))
  console.log({ reqUserId })
  if (
    newUserObject.existingUser.proposalSent?.find(i => reqUserId) ||
    newUserObject.existingUser.proposalAccepted?.find(i => reqUserId) ||
    newUserObject.existingUser._id == reqUserId
  ) {
    return newUserObject
  }
  // Hide sensitive information in 'existingUser'
  delete newUserObject.existingUser.name
  delete newUserObject.existingUser.email
  // delete newUserObject.existingUser.savedIds
  // delete newUserObject.existingUser.saverIds

  // Hide sensitive information in 'personal'
  delete newUserObject.personal.firstName
  delete newUserObject.personal.lastName

  return newUserObject
}

class UserService {
  constructor () {
    this.repository = new UserRepository()
  }

  async SignUp (userInputs) {
    const { email, password, name } = userInputs
    const existingUser = await this.repository.FindUser({ email })
    if (existingUser) {
      return FormateData({ error: 'Email Already Exist !' })
    }
    let salt = await GenerateSalt()
    let userPassword = await GeneratePassword(password, salt)
    const existUser = await this.repository.CreateUser({
      email,
      password: userPassword,
      name,
      salt
    })
    console.log({ existUser })

    const token = await GenerateSignature({
      email: email,
      _id: existUser._id
    })
    return FormateData({
      id: existUser._id,
      token,
      name: existUser.name,
      active: existUser.active
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
            _id: existingUser._id
          })
          return FormateData({
            id: existingUser._id,
            token,
            name: existingUser.name,
            active: existingUser.active
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

  async FindUserProfileById (userId, reqUserId) {
    const existingUser = await this.repository.FindUserProfileById(userId)
    return hideSensitiveInformation(existingUser, reqUserId)
  }

  async UpdateUser (userInputs) {
    const { email, password, ...DataToUpdate } = userInputs
    const existingUser = await this.repository.UpdateUser(DataToUpdate)
    return FormateData(existingUser)
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
}

export default UserService
