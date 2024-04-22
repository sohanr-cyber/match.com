import { GMAIL, PASSWORD } from '@/config'
import { sendProposalHtml } from '@/utility/mail'
import nodemailer from 'nodemailer'
const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
// const client = require('twilio')(accountSid, authToken)
const from = process.env.FROM
import twilio from 'twilio'
const client = twilio(accountSid, authToken)
class Notification {
  constructor () {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      secure: true,
      port: 465,
      auth: {
        user: GMAIL,
        pass: PASSWORD
      }
    })
    this.from = 'MuslimMatchMaker@gmail.com'
  }
  async sendMail (to) {
    // send mail with defined transport object
    try {
      const info = await this.transporter.sendMail({
        from: this.from,
        to: to,
        subject: '', // Subject line
        html: html() // html body
      })
    } catch (error) {
      console.log(error)
    }
  }

  async sendMessage () {
    try {
      await client.messages
        .create({
          body: 'hi, this is prgrammable message from Muslim Match Maker',
          from: '+15162520310',
          to: '+8801744329811'
        })
        .then(message => console.log(message.sid))
    } catch (error) {
      console.log(error)
    }
  }

  // got proposal
  async sendProposalNotificationToReciever ({
    senderName,
    senderId,
    recieverEmail,
    recieverId,
    recieverName,
    status,
    message
  }) {
    try {
      const info = await this.transporter.sendMail({
        from: this.from,
        to: recieverEmail,
        subject: 'Muslim Match Maker এ আপনি একটি প্রস্তাব পেয়েছেন', // Subject line
        html: sendProposalHtml({
          senderName,
          senderId,
          recieverEmail,
          recieverId,
          recieverName,
          status,
          message
        }) // html body
      })
    } catch (error) {
      console.log(error)
    }
  }

  // got proposal/ proposal status update
  async sendProposalNotificationUpdateToReciever ({
    senderName,
    senderId,
    recieverEmail,
    recieverId,
    recieverName,
    status,
    message
  }) {
    try {
      const info = await this.transporter.sendMail({
        from: this.from,
        to: recieverEmail,
        subject: 'Muslim Match Maker এ আপনার প্রস্তাবের আবস্থা পরিবর্তন হয়েছে', // Subject line
        html: sendProposalHtml({
          senderName,
          senderId,
          recieverEmail,
          recieverId,
          recieverName,
          status,
          message
        }) // html body
      })
    } catch (error) {
      console.log(error)
    }
  }

  // got proposal/ proposal status update
  async sendProposalResendNotificationToReciever ({
    senderName,
    senderId,
    recieverEmail,
    recieverId,
    recieverName,
    status,
    message
  }) {
    try {
      const info = await this.transporter.sendMail({
        from: this.from,
        to: recieverEmail,
        subject: 'Muslim Match Maker এ আপনাকে আবারও প্রস্তাবটি পাঠানো হলো', // Subject line
        html: sendProposalHtml({
          senderName,
          senderId,
          recieverEmail,
          recieverId,
          recieverName,
          status,
          message
        }) // html body
      })
    } catch (error) {
      console.log(error)
    }
  }

  // when prposal get rejected/declined/accepted
  async sendProposalNotificationToSender ({
    senderName,
    senderId,
    recieverEmail,
    recieverId,
    recieverName,
    status,
    senderEmail
  }) {
    try {
      const info = await this.transporter.sendMail({
        from: this.from,
        to: senderEmail,
        subject: 'Muslim Match Maker এ আপনার প্রস্তাবের আবস্থা পরিবর্তন হয়েছে', // Subject line
        html: sendProposalHtml({
          // senderName,
          // senderId,
          recieverEmail: senderEmail,
          recieverId: senderId,
          recieverName: senderName,
          status
        }) // html body
      })
    } catch (error) {
      console.log(error)
    }
  }

  async UpdatePropsalNotification () {}

  // got proposal/ proposal status update
  async sendCodeToMail ({
    recieverEmail,
    recieverId,
    recieverName,
    verificationCode,
    reset
  }) {
    console.log({ recieverEmail, recieverId, recieverName, verificationCode })
    try {
      const info = await this.transporter.sendMail({
        from: this.from,
        to: recieverEmail,
        subject: `Muslim Match Maker - ${
          reset ? 'Password Reset' : 'Verification'
        } Code`, // Subject line
        html: sendProposalHtml({
          recieverEmail,
          recieverId,
          recieverName,
          status: 'codeSent',
          code: verificationCode,
          reset
        }) // html body
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export default Notification
