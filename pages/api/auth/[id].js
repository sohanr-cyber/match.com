import nextConnect from 'next-connect'
import { isAuthOptional } from '@/utils'
import { readProfile } from '@/services/profile-read-service'

const handler = nextConnect()
handler.use(isAuthOptional)

handler.get(async (req, res) => {
  try {
    const profile = await readProfile({
      id: req.query.id,
      viewerId: req.user?._id,
      update: req.query.update
    })
    if (!profile) return res.status(404).json({ error: 'Profile not found.' })
    return res.status(200).json(profile)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Could not load profile.' })
  }
})

export default handler
