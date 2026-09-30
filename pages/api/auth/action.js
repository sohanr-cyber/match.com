export default function handler (req, res) {
  res.setHeader('Allow', 'GET')
  return res.status(410).json({ error: 'This maintenance endpoint is no longer available.' })
}
