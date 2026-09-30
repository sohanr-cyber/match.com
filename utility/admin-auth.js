import db from '@/database/connection'
import User from '@/database/model/User'

export default async function requireAdmin (req, res, next) {
  try {
    await db.connect()
    const user = await User.findById(req.user._id).select('role').lean()
    if (!user || user.role !== 'admin') return res.status(403).json({ error: 'Admin access required.' })
    return next()
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Could not verify admin access.' })
  }
}