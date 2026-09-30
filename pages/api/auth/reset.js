import db from '@/database/connection'
import User from '@/database/model/User'
import { GeneratePassword } from '@/utility'
import { normalizePhone } from '@/utility/phone'
import nextConnect from 'next-connect'

const handler = nextConnect()

handler.post(async (req, res) => {
  try {
    const { code, newPassword } = req.body
    const phone = normalizePhone(req.body.phone)
    const email = typeof req.body.email === 'string' ? req.body.email.trim().toLowerCase() : ''
    const legacyEmail = !phone && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    if ((!phone && !legacyEmail) || !code || !newPassword) {
      return res.status(200).json({ error: 'Fill all fields.' })
    }
    await db.connect()
    const user = await User.findOne(phone
      ? { phone }
      : { email, $or: [{ phone: { $exists: false } }, { phone: null }, { phone: '' }] }
    ).select('+verificationCode +expirationTime +verificationAttempts')
    if (!user) return res.status(200).json({ error: 'Invalid verification code.' })
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
    user.verificationAttempts = 0
    user.expirationTime = undefined
    user.password = await GeneratePassword(newPassword, user.salt)
    await user.save()
    return res.status(200).json({ message: 'Password reset. Please sign in.' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Could not reset password.' })
  }
})

export default handler
