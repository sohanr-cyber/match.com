import Profile from './pages/profile/index.js'
import {
  ValidateSignature,
  ValidateSignatureOptional
} from './utility/index.js'

function ageToDateOfBirth (age) {
  var currentDate = new Date()
  var currentYear = currentDate.getFullYear()
  var birthYear = currentYear - age

  var dateOfBirth = new Date(birthYear, 0, 1)
  return dateOfBirth.toISOString().split('T')[0] // Format as YYYY-MM-DD
}

function calculateAge (dateOfBirth, ln) {
  // Parse the date of birth
  const dob = new Date(dateOfBirth)

  // Get the current date
  const currentDate = new Date()

  // Calculate the difference in years
  let age = currentDate.getFullYear() - dob.getFullYear()

  // Check if the birthday has occurred this year or not
  const currentMonth = currentDate.getMonth()
  const birthMonth = dob.getMonth()
  if (
    currentMonth < birthMonth ||
    (currentMonth === birthMonth && currentDate.getDate() < dob.getDate())
  ) {
    age--
  }

  if (ln && ln == 'bn') {
    return englishToBangla(age)
  } else return age
}

const transparency = 0.2
const colorsWithTransparency = [
  `rgba(255, 0, 0, ${transparency})`, // Red with 10% opacity
  `rgba(0, 255, 0, ${transparency})`, // Green with 10% opacity
  `rgba(0, 0, 255, ${transparency})`, // Blue with 10% opacity
  `rgba(255, 255, 0, ${transparency})`, // Yellow with 10% opacity
  `rgba(255, 0, 255, ${transparency})`, // Magenta with 10% opacity
  `rgba(0, 255, 255, ${transparency})`, // Cyan with 10% opacity
  `rgba(128, 0, 0, ${transparency})`, // Maroon with 10% opacity
  `rgba(0, 128, 0, ${transparency})`, // Green (Dark) with 10% opacity
  `rgba(0, 0, 128, ${transparency})`, // Navy with 10% opacity
  `rgba(128, 128, 0, ${transparency})`, // Olive with 10% opacity
  `rgba(128, 0, 128, ${transparency})`, // Purple with 10% opacity
  `rgba(0, 128, 128, ${transparency})`, // Teal with 10% opacity
  `rgba(255, 165, 0, ${transparency})`, // Orange with 10% opacity
  `rgba(128, 128, 128, ${transparency})`, // Gray with 10% opacity
  `rgba(192, 192, 192, ${transparency})`, // Silver with 10% opacity
  `rgba(255, 192, 203, ${transparency})`, // Pink with 10% opacity
  `rgba(0, 255, 127, ${transparency})`, // Spring Green with 10% opacity
  `rgba(255, 140, 0, ${transparency})`, // Dark Orange with 10% opacity
  `rgba(75, 0, 130, ${transparency})`, // Indigo with 10% opacity
  `rgba(173, 216, 230, ${transparency})` // Light Blue with 10% opacity
]

function englishToBangla (number, ln) {
  if (!number) {
    return
  }
  if (ln == 'en-US') {
    return number
  }
  const banglaNumbers = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯']
  const englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

  let banglaNumber = ''
  const numberString = number.toString()

  for (let i = 0; i < numberString.length; i++) {
    const index = englishNumbers.indexOf(numberString[i])
    if (index !== -1) {
      banglaNumber += banglaNumbers[index]
    } else {
      banglaNumber += numberString[i]
    }
  }

  return banglaNumber
}
//{Math.floor(profile.height / 12)}&quot;{profile.height % 12}

function heightToFeet (height, ln) {
  if (ln == 'en-US') {
    return `${Math.floor(height / 12)}"${height % 12}'`
  } else {
    return `${englishToBangla(Math.floor(height / 12))}"${englishToBangla(
      height % 12
    )}'`
  }
}

const isAuth = async (req, res, next) => {
  const isAuthorized = await ValidateSignature(req)
  if (isAuthorized) {
    return next()
  }
  return res.status(403).json({ message: 'Not Authorized' })
}

const isAuthOptional = async (req, res, next) => {
  const isAuthorized = await ValidateSignatureOptional(req)
  if (isAuthorized) {
    return next()
  }
  return res.status(403).json({ message: 'Not Authorized' })
}

export {
  calculateAge,
  colorsWithTransparency,
  ageToDateOfBirth,
  isAuth,
  isAuthOptional,
  englishToBangla,
  heightToFeet
}
