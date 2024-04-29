import fs from 'fs'
import nextConnect from 'next-connect'
import { Router } from 'next/router'

const handler = nextConnect()

handler.get(async (req, res) => {
  try {
    fs.readFile('district.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err)
        res.status(500).json({ error: 'Internal Server Error' })
        return
      }

      // Parse the JSON data
      const jsonData = JSON.parse(data)
      const district = jsonData.districts.find(obj => req.query.id in obj)
      console.log(district)

   
      return res.json(district[req.query.id])
    })
  } catch (error) {
    console.log(error)
  }
})

export default handler
