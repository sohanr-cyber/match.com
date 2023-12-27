import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import { APP_SECRET } from '@/config'

const GenerateSalt = async () => {
  return await bcrypt.genSalt(10)
}

const GeneratePassword = async (password, salt) => {
  return await bcrypt.hash(password, salt)
}

const ValidatePassword = async (enteredPassword, savedPassword, salt) => {
  console.log({ salt, enteredPassword })
  return (await GeneratePassword(enteredPassword, salt)) == savedPassword
}

const GenerateSignature = async payload => {
  try {
    return await jwt.sign(payload, APP_SECRET, { expiresIn: '30d' })
  } catch (error) {
    console.log(error)
    return error
  }
}

const ValidateSignature = async req => {
  try {
    const { authorization: signature } = req.headers
    console.log({ signature })
    const payload = await jwt.verify(signature.split(' ')[1], APP_SECRET)
    req.user = payload
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

const FormateData = data => {
  if (data) {
    return { data }
  } else {
    throw new Error('Data Not found!')
  }
}

export {
  GenerateSalt,
  GeneratePassword,
  ValidatePassword,
  GenerateSignature,
  ValidateSignature,
  FormateData
}
