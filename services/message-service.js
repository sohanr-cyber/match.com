import axios from 'axios'

class Message {
  async sendMessage({ number, message }) {
    if (!number || !message) throw new Error('Missing number or message')
    const brandPrefix = '(Muslim Match Maker )'
    const brandedMessage = String(message).startsWith(brandPrefix)
      ? String(message)
      : `${brandPrefix} ${message}`
    const apiKey = process.env.BULK_SMS_API_KEY
    const senderId = process.env.BULK_SMS_SENDER_ID
    if (!apiKey || !senderId) throw new Error('SMS service is not configured')

    const { data } = await axios.post(
      'https://bulksmsbd.net/api/smsapi',
      { api_key: apiKey, senderid: senderId, number, message: brandedMessage },
      { headers: { 'Content-Type': 'application/json' }, timeout: 10000 }
    )
    if (String(data?.response_code) !== '202') {
      throw new Error('SMS provider rejected the message')
    }
    return data
  }
}

export default Message
