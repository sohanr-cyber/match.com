import fs from 'fs'
import nextConnect from 'next-connect'

const handler = nextConnect()

handler.get(async (req, res) => {
  try {
    fs.readFile('division.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err)
        res.status(500).json({ error: 'Internal Server Error' })
        return
      }

      // Parse the JSON data
      const jsonData = JSON.parse(data)

      // Send the division data
      res.json(jsonData.division)
    })
  } catch (error) {
    console.log(error)
  }
})

export default handler
