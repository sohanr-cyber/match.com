const url = 'https://bdapis.com/api/v1.1'
const axios = require('axios')

const fs = require('fs')

const fetchDivision = async () => {
  try {
    const { data } = await axios.get(`${url}/divisions`)
    // createJSONFile('division.json', { division: data })
    const districts = await Promise.all(
      data.data.map(async city => {
        try {
          const { data } = await axios.get(`${url}/division/${city._id}`)
          let obj = {}
          obj[city._id] = data
          return obj
        } catch (error) {
          console.log(error)
        }
      })
    )
    console.log({ districts })
    createJSONFile('district.json', { districts })
  } catch (error) {
    console.log(error)
  }
}

fetchDivision()

function createJSONFile (filename, data) {
  const jsonData = JSON.stringify(data, null, 2)
  fs.writeFile(filename, jsonData, 'utf8', err => {
    if (err) {
      console.error('Error writing JSON file:', err)
    } else {
      console.log('JSON file created successfully!')
    }
  })
}
