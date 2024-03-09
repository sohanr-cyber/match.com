import { GMAIL, PASSWORD } from '@/config'
import { sendProposalHtml } from '@/utility/mail'
import nodemailer from 'nodemailer'

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
  async sendProposalNotification ({ senderName, senderId, recieverEmail }) {
    try {
      const info = await this.transporter.sendMail({
        from: this.from,
        to: recieverEmail,
        subject: 'Marriage Proposal From Muslim Match Maker', // Subject line
        html: sendProposalHtml({ senderName, senderId }) // html body
      })
    } catch (error) {
      console.log(error)
    }
  }
  async UpdatePropsalNotification () {}
}

export default Notification
