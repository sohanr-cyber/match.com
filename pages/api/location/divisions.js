import { divisions } from '@/utility/divisions'
import fs from 'fs'
import nextConnect from 'next-connect'

const handler = nextConnect()

handler.get(async (req, res) => {
  try {
    return res.status(200).send(divisions)
  } catch (error) {
    console.log(error)
  }
})

export default handler
