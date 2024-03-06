import nc from 'next-connect'
import axios from 'axios'
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

const handler = nc()
handler.use(bkash_headers)
handler.get(async (req, res) => {
  const { paymentID, status } = req.query
  if (status === 'cancel' || status === 'failure') {
    return res.redirect(`http://localhost:3000/error?message=${status}`)
  }

  if (status === 'success') {
    try {
      const { data } = await axios.post(
        process.env.bkash_execute_payment_url,
        { paymentID },
        {
          headers: await this.bkash_headers()
        }
      )
      if (data && data.statusCode === '0000') {
        //const userId = globals.get('userId')
        //   await paymentModel.create({
        //     userId: Math.random() * 10 + 1,
        //     paymentID,
        //     trxID: data.trxID,
        //     date: data.paymentExecuteTime,
        //     amount: parseInt(data.amount)
        //   })

        return res.redirect(`http://localhost:3000/success`)
      } else {
        return res.redirect(
          `http://localhost:3000/error?message=${data.statusMessage}`
        )
      }
    } catch (error) {
      console.log(error)
      return res.redirect(`http://localhost:3000?message=${error.message}`)
    }
  }
})

export default handler
