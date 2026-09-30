import db from '@/database/connection'
import User from '@/database/model/User'
import { isAuth } from '@/utils'
import nextConnect from 'next-connect'

const handler = nextConnect()
handler.use(isAuth)

handler.get(async (req, res) => {
  try {
    await db.connect()
    const admin = await User.findById(req.user._id).select('role').lean()
    if (!admin || admin.role !== 'admin') return res.status(403).json({ error: 'Admin access required.' })

    const page = Math.max(1, Number.parseInt(req.query.page, 10) || 1)
    const limit = Math.min(50, Math.max(1, Number.parseInt(req.query.limit, 10) || 20))
    const search = String(req.query.search || '').trim().slice(0, 80)
    const status = String(req.query.status || 'all')
    const filters = {}
    if (status === 'active') filters.active = true
    if (status === 'pending') filters.isVerified = false
    if (search) {
      const safe = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      filters.$or = [{ name: { $regex: safe, $options: 'i' } }, { email: { $regex: safe, $options: 'i' } }, { phone: { $regex: safe } }, { profileId: Number(search) || -1 }]
    }

    const [users, total] = await Promise.all([
      User.find(filters)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .select('name email role active isVerified gender city profileId createdAt +phone')
        .lean(),
      User.countDocuments(filters)
    ])
    return res.status(200).json({ users, total, page, pages: Math.max(1, Math.ceil(total / limit)) })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Could not load users.' })
  }
})

export default handler
