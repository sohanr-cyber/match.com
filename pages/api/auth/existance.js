import db from '@/database/connection'
import User from '@/database/model/User'
import Message from '@/services/message-service'
import Notification from '@/services/notification-service'
import { generateVerificationCode } from '@/utility/helper'
import { normalizePhone } from '@/utility/phone'
import nextConnect from 'next-connect'

const handler = nextConnect()

handler.post(async (req, res) => {
  try {
    const phone = normalizePhone(req.body.phone)
    const email = typeof req.body.email === 'string' ? req.body.email.trim().toLowerCase() : ''
    const legacyEmail = !phone && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    if (!phone && !legacyEmail) {
      return res.status(200).json({ error: 'Enter a valid phone number or existing account email.' })
    }

    await db.connect()
    const user = await User.findOne(phone
      ? { phone }
      : { email, $or: [{ phone: { $exists: false } }, { phone: null }, { phone: '' }] }
    ).select('+verificationCode +expirationTime +lastVerificationSentAt +verificationAttempts')
    if (!user) return res.status(200).json({ error: 'User not found.' })
    if (user.lastVerificationSentAt && Date.now() - new Date(user.lastVerificationSentAt).getTime() < 60_000) {
      return res.status(200).json({ error: 'Please wait a minute before requesting another code.' })
    }

    const verificationCode = generateVerificationCode(6)
    user.verificationCode = verificationCode
    user.verificationAttempts = 0
    user.expirationTime = new Date(Date.now() + 5 * 60 * 1000)
    user.lastVerificationSentAt = new Date()
    await user.save()
    try {
      if (legacyEmail) {
        await new Notification().sendCodeToMail({
          recieverEmail: user.email,
          recieverName: user.name,
          recieverId: user._id,
          verificationCode,
          reset: true
        })
      } else {
        await new Message().sendMessage({
          number: phone,
          message: 'Your Muslim Match Maker password reset code is ' + verificationCode + '. It expires in 5 minutes.'
        })
      }
    } catch (error) {
      user.lastVerificationSentAt = undefined
      await user.save()
      console.error('Could not send password reset code:', error.message)
      return res.status(200).json({ error: 'Could not send code. Please try again.' })
    }
    return res.status(200).json({ message: legacyEmail ? 'Code sent to your email.' : 'Code sent to your phone.' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Could not request a reset code.' })
  }
})

export default handler
