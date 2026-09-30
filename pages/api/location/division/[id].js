import { districts } from '@/utility/districts'

export default function handler (req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({ error: 'Method not allowed.' })
  }
  const key = String(req.query.id || '').trim().toLowerCase()
  const result = districts.find(item => Object.prototype.hasOwnProperty.call(item, key))?.[key]
  if (!result) return res.status(404).json({ error: 'Division not found.' })
  res.setHeader('Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400')
  return res.status(200).json(result)
}
