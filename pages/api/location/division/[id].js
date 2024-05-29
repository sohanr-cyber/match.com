import { districts } from '@/utility/districts'
import fs from 'fs'
import nextConnect from 'next-connect'

const handler = nextConnect()

handler.get(async (req, res) => {
  try {
    const district = districts.find(obj => req.query.id in obj)
    console.log(district)

    return res.json(district[req.query.id.toLowerCase()])
  } catch (error) {
    console.log(error)
  }
})


export default handler
