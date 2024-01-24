import UserRepository from '@/database/repository/user-repository'

import {
  GenerateSalt,
  GeneratePassword,
  ValidatePassword,
  GenerateSignature,
  ValidateSignature,
  FormateData
} from '@/utility/index'

class UserService {
  constructor () {
    this.repository = new UserRepository()
  }

  async SignUp (userInputs) {
    const { email, password, name } = userInputs

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
    return FormateData({ id: existUser._id, token })
  }

  async SignIn (userInputs) {
    try {
      console.log(userInputs)
      const { email, password } = userInputs
      const existingUser = await this.repository.FindUser({ email })
      console.log({ existingUser })
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
          return FormateData({ id: existingUser._id, token })
        }
      }

      return FormateData({ error: 'User Not Found' })
    } catch (error) {
      console.log(error)
    }
  }

  async FindUserProfileById (userId) {
    const existingUser = await this.repository.FindUserProfileById(userId)
    console.log({ existingUser })
    return existingUser
  }

  async UpdateUser (userInputs) {
    const { email, password, ...DataToUpdate } = userInputs
    const existingUser = await this.repository.UpdateUser(DataToUpdate)
    return FormateData(existingUser)
  }
}

export default UserService
