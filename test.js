const axios = require('axios')
let dict = {}
let arr = []

const fs = require('fs')

const fetchCity = async () => {
  try {
    const { data } = await axios.get('https://bdapis.com/api/v1.1/divisions')
    data.data.forEach(e => {
      dict[e.division] = e.divisionbn
      arr.push(e.division)
    })
    if (data) {
      fetchD()
      // createJSONFile('location.json', { arr: fetchD() })
    }
  } catch (error) {
    console.log(error)
  }
}

fetchCity()

let d = []
const fetchD = async (index = 0) => {
  if (index >= arr.length) {
    createJSONFile('location.json', { arr: d })
    return d
  }
  try {
    const { data } = await axios.get(
      `https://bdapis.com/api/v1.1/division/${arr[index]}`
    )
    if (data) {
      data.data.forEach(i => {
        d = [...d, i.district, ...i.upazilla]
      })
      fetchD((index += 1))
    }
  } catch (error) {
    console.log(error)
  }
}

function createJSONFile (filename, data) {
  // Convert the JavaScript object to JSON format
  const jsonData = JSON.stringify(data, null, 2)

  // Write the JSON data to a file
  fs.writeFile(filename, jsonData, 'utf8', err => {
    if (err) {
      console.error('Error writing JSON file:', err)
    } else {
      console.log('JSON file created successfully!')
    }
  })
}

// createJSONFile('filename', { name: 'sohan' })
