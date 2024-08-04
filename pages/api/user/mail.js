import Notification from '@/services/notification-service'
import UserService from '@/services/user-service'
import { isAuth } from '@/utils'
import nextConnect from 'next-connect'

const handler = nextConnect()
const notificaton = new Notification()

// handler.use(isAuth)
handler.post(async (req, res) => {
  const { subject, email, name, many, message } = req.body
  console.log(req.body)
  try {
    await notificaton.sendMail({
      email,
      name,
      subject,
      message,
      status: 'message'
    })
    return res.status(200).send({
      message: 'mail send sucessfully'
    })
  } catch (error) {
    console.log(error)
    return res.status(400).send({
      error: 'Something went wrong !'
    })
  }
})

export default handler
