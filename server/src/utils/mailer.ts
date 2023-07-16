import nodemailer, { type SendMailOptions } from 'nodemailer'
import { config } from '../config'
import log from './logger'

const smtp = config.smtp

const transporter = nodemailer.createTransport({
	...smtp,
	auth: { user: smtp.user, pass: smtp.pass },
})

export const sendMail = async (payload: SendMailOptions) => {
	transporter.sendMail(payload, (err, info) => {
		if (err) {
			log.error(err, 'Error sending email')
			return
		}

		log.info(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`)
	})
}
