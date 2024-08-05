import db from '@/database/connection'
import User from '@/database/model/User'
import Notification from '@/services/notification-service'
import UserService from '@/services/user-service'
import { GenerateSignature } from '@/utility'
import { generateVerificationCode } from '@/utility/helper'
import nextConnect from 'next-connect'
const handler = nextConnect()

handler.post(async (req, res) => {
  try {
    await db.connect()
    const { userId, code } = req.body

    const user = await User.findById(userId)
    if (user.isVerified == true) {
      const token = await GenerateSignature({
        email: user.email,
        _id: user._id,
        isVerified: user.isVerified
      })
      // Return success response
      return res.status(200).json({
        id: user._id,
        token,
        name: user.name,
        active: user.active,
        isVerified: user.isVerified
      })
    }
    // Check if the user exists and if the provided code matches
    if (!user || user.verificationCode !== code) {
      console.log('invalid input')
      return res.status(200).json({ error: 'Invalid verification code.' })
    }

    // Check if the code has expired
    if (user.expirationTime && new Date() > new Date(user.expirationTime)) {
      console.log('expired')
      return res.status(200).json({ error: 'Verification code has expired.' })
    }

    // Update isVerified field to true
    user.isVerified = true

    // Clear verification code and expiration time
    user.verificationCode = undefined
    user.expirationTime = undefined

    // Save the updated user document
    await user.save()
    const token = await GenerateSignature({
      email: user.email,
      _id: user._id,
      isVerified: user.isVerified,
      
    })
    // Return success response
    return res.status(200).json({
      id: user._id,
      token,
      name: user.name,
      active: user.active,
      isVerified: user.isVerified,
      profileId: user.profileId
    })
  } catch (error) {
    console.log(error)
    res.status(400).send({ error: 'internal server error' })
  }
})

handler.put(async (req, res) => {
  try {
    const { email } = req.body
    await db.connect()
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(200).json({ error: 'User not found !' })
    }

    if (user.isVerified) {
      return res.status(200).json({ error: 'Allready Verified !' })
    }

    const verificationCode = generateVerificationCode(6)
    user.verificationCode = verificationCode
    const expirationTime = new Date()
    expirationTime.setMinutes(expirationTime.getMinutes() + 5)
    user.expirationTime = expirationTime
    console.log(verificationCode)
    await user.save()
    await db.disconnect()
    const notification = new Notification()
    await notification.sendCodeToMail({
      recieverEmail: user.email,
      recieverName: user.name,
      recieverId: user._id,
      verificationCode: user.verificationCode
    })
    return res.status(200).json({ message: 'Code Sent To Your Mail' })
  } catch (error) {
    console.log(error)
    res.status(400)
  }
})

export default handler
