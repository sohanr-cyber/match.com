import db from '@/database/connection'
import User from '@/database/model/User'
import Notification from '@/services/notification-service'
import UserService from '@/services/user-service'
import { GenerateSignature } from '@/utility'
import { generateVerificationCode } from '@/utility/helper'
import nextConnect from 'next-connect'

const handler = nextConnect()
const notification = new Notification()

handler.post(async (req, res) => {
  try {
    const { email } = req.body
    await db.connect()

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(200).json({ error: 'User not found' })
    }

    const verificationCode = generateVerificationCode(6)
    user.verificationCode = verificationCode
    const expirationTime = new Date()
    expirationTime.setMinutes(expirationTime.getMinutes() + 5)
    user.expirationTime = expirationTime

    await user.save()
    await notification.sendCodeToMail({
      recieverEmail: user.email,
      recieverName: user.name,
      recieverId: user._id,
      verificationCode: user.verificationCode,
      reset: true
    })
    return res.status(200).json({ message: 'Code Sent To Your Mail' })
  } catch (error) {
    console.log(error)
    res.status(400)
  }
})

export default handler
