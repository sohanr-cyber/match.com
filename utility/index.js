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

const readToken = req => {
  const match = /^Bearer (\S+)$/i.exec(req.headers.authorization || '')
  return match?.[1]
}

const ValidateSignature = async req => {
  const token = readToken(req)
  if (!token) return false
  try {
    req.user = jwt.verify(token, APP_SECRET)
    return true
  } catch {
    return false
  }
}

const ValidateSignatureOptional = async req => {
  const token = readToken(req)
  if (!token) {
    req.user = {}
    return true
  }
  try {
    req.user = jwt.verify(token, APP_SECRET)
    return true
  } catch {
    return false
  }
}
const FormateData = data => {
  if (data) {
    return data
  } else {
    throw new Error('Data Not found!')
    console.log({ data })
  }
}

export {
  GenerateSalt,
  GeneratePassword,
  ValidatePassword,
  GenerateSignature,
  ValidateSignature,
  FormateData,
  ValidateSignatureOptional
}
