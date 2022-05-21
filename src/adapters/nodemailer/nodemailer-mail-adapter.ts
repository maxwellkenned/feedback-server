import nodemailer from 'nodemailer'
import { env } from 'process'

import { IMailAdapter, ISendMailData } from '../mail-adapters'

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: env.MAILTRAP_USER,
    pass: env.MAILTRAP_PASS,
  },
})

export class NodemailerMailAdapter implements IMailAdapter {
  async sendMail({ subject, body }: ISendMailData) {
    await transport.sendMail({
      from: 'Equipe Feedget <oi@feedget.com>',
      to: env.EMAIL_TO,
      subject,
      html: body,
    })
  }
}
