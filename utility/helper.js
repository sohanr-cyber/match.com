import mongoose from "mongoose"
import { randomInt } from "crypto"

function generateVerificationCode (length) {
  return Array.from({ length }, () => randomInt(0, 10)).join('')
}

function verifyCode (enteredCode, generatedCode) {
  return enteredCode === generatedCode
}

function generateUniqueID (existingIDs) {
  let number
  do {
    // Generate a random 6-digit number
    number = Math.floor(100000 + Math.random() * 900000)
  } while (existingIDs.includes(number)) // Check if the number is already in use

  // Add the new ID to the existing list
  existingIDs.push(number)

  return number
}

function isValidObjectId (userId) {
  return mongoose.Types.ObjectId.isValid(userId)
}

export {
  generateVerificationCode,
  verifyCode,
  generateUniqueID,
  isValidObjectId
}
