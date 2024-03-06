import UserService from '@/services/user-service'
import { isAuth } from '@/utils'
import nextConnect from 'next-connect'
import axios from 'axios'
import globals, { isProtected } from 'node-global-storage'
import { v4 as uuidv4 } from 'uuid'
const handler = nextConnect()

const getToken = async () => {
  try {
    const { data } = await axios.post(
      process.env.bkash_grant_token_url,
      {
        app_key: process.env.bkash_api_key,
        app_secret: process.env.bkash_secret_key
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          username: process.env.bkash_username,
          password: process.env.bkash_password
        }
      }
    )
    console.log(data.id_token)
    return data.id_token
  } catch (error) {
    console.log(error)
    return res.status(401).json({ error: error })
  }
}
const bkash_headers = async (req, res, next) => {
  req.headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    authorization: await getToken(),
    'x-app-key': process.env.bkash_api_key
  }
  next()
}

handler.use(bkash_headers)
handler.post(async (req, res) => {
  const { amount, userId } = req.body
  // globals.set('userId', userId)

  try {
    const { data } = await axios.post(
      process.env.bkash_create_payment_url,
      {
        mode: '0011',
        payerReference: ' ',
        callbackURL: 'http://localhost:3000/api/bkash/payment/callback',
        amount: amount,
        currency: 'BDT',
        intent: 'sale',
        merchantInvoiceNumber: 'Inv' + uuidv4().substring(0, 5)
      },
      {
        headers: req.headers
      }
    )
    console.log(data)
    return res.redirect(data.bkashURL)

    // return res.status(200).json({ bkashURL: data.bkashURL })
  } catch (error) {
    return res.status(401).json({ error: error.message })
  }
})

// refund
handler.put(async (req, res) => {
  try {
    const payment = await paymentModel.findOne({ trxID })

    const { data } = await axios.post(
      process.env.bkash_refund_transaction_url,
      {
        paymentID: payment.paymentID,
        amount: payment.amount,
        trxID,
        sku: 'payment',
        reason: 'cashback'
      },
      {
        headers: req.headers
      }
    )
    if (data && data.statusCode === '0000') {
      return res.status(200).json({ message: 'refund success' })
    } else {
      return res.status(404).json({ error: 'refund failed' })
    }
  } catch (error) {
    return res.status(404).json({ error: 'refund failed' })
  }
})


export default handler
