import db from '@/database/connection'
import User from '@/database/model/User'
import { isValidObjectId } from '@/utility/helper'

export default async function resolveProfileUpdateTarget (req, res, requestedId) {
  await db.connect()
  const id = String(requestedId || '')
  const targetQuery = isValidObjectId(id) ? { _id: id } : { profileId: id }
  const target = await User.findOne(targetQuery).select('_id').lean()
  if (!target) {
    res.status(404).json({ error: 'Member not found.' })
    return null
  }

  if (String(target._id) === String(req.user._id)) return String(target._id)

  const requester = await User.findById(req.user._id).select('role').lean()
  if (requester?.role !== 'admin') {
    res.status(403).json({ error: 'You are not allowed to update this profile.' })
    return null
  }
  return String(target._id)
}
