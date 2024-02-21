function encodeStringToNumber (str) {
  let encodedNumber = ''
  for (let i = 0; i < str.length; i++) {
    encodedNumber += str.charCodeAt(i).toString().padStart(3, '0')
  }
  return encodedNumber
}

function decodeNumberToString (encodedNumber) {
  let decodedString = ''
  for (let i = 0; i < encodedNumber.length; i += 3) {
    decodedString += String.fromCharCode(
      parseInt(encodedNumber.substr(i, 3), 10)
    )
  }
  return decodedString
}

