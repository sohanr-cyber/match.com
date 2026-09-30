import db from '@/database/connection'
import User from '@/database/model/User'
import Message from '@/services/message-service'
import { GenerateSignature } from '@/utility'
import { generateVerificationCode } from '@/utility/helper'
import { normalizePhone } from '@/utility/phone'
import nextConnect from 'next-connect'

const handler = nextConnect()

handler.post(async (req, res) => {
  try {
    await db.connect()
    const { userId, code } = req.body
    if (!userId || !code) return res.status(200).json({ error: 'Enter your verification code.' })

    const user = await User.findById(userId).select('+phone +verificationCode +expirationTime +verificationAttempts')
    if (!user) return res.status(200).json({ error: 'User not found.' })
    if (user.isVerified) return res.status(200).json({ error: 'Account already verified.' })
    if ((user.verificationAttempts || 0) >= 5) {
      return res.status(200).json({ error: 'Too many attempts. Request a new code.' })
    }
    if (user.verificationCode !== code) {
      user.verificationAttempts = (user.verificationAttempts || 0) + 1
      await user.save()
      return res.status(200).json({ error: 'Invalid verification code.' })
    }
    if (!user.expirationTime || new Date() > new Date(user.expirationTime)) {
      return res.status(200).json({ error: 'Verification code has expired.' })
    }
    user.isVerified = true
    user.verificationCode = undefined
    user.expirationTime = undefined
    user.verificationAttempts = 0
    await user.save()

    const token = await GenerateSignature({
      phone: user.phone,
      _id: user._id,
      isVerified: user.isVerified
    })
    return res.status(200).json({
      id: user._id,
      token,
      phone: user.phone,
      name: user.name,
      active: user.active,
      isVerified: user.isVerified,
      profileId: user.profileId,
      role: user.role
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Could not verify code.' })
  }
})

handler.put(async (req, res) => {
  try {
    const phone = normalizePhone(req.body.phone)
    if (!phone) return res.status(200).json({ error: 'Enter a valid phone number.' })
    await db.connect()
    const user = await User.findOne({ phone }).select('+verificationCode +expirationTime +lastVerificationSentAt +verificationAttempts')
    if (!user) return res.status(200).json({ error: 'User not found.' })
    if (user.isVerified) return res.status(200).json({ error: 'Account already verified.' })
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
      await new Message().sendMessage({
        number: phone,
        message: 'Your Muslim Match Maker verification code is ' + verificationCode + '. It expires in 5 minutes.'
      })
    } catch (error) {
      user.lastVerificationSentAt = undefined
      await user.save()
      console.error('Could not resend verification SMS:', error.message)
      return res.status(200).json({ error: 'Could not send SMS. Please try again.' })
    }
    return res.status(200).json({ message: 'Code sent to your phone.' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Could not send verification code.' })
  }
})

export default handler
