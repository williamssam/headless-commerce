import nodemailer, { type SendMailOptions } from 'nodemailer'
import log from './logger'

// FIXME: REMEMBER TO CHANGE THIS BEFORE GOING TO PRODUCTION

// const smtp = config.smtp

// test details
const smtp = {
	host: 'localhost',
	port: 1025,
	auth: {
		user: 'project.1',
		pass: 'secret.1',
	},
}

const transporter = nodemailer.createTransport({
	...smtp,
	connectionTimeout: 5 * 60 * 1000,
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
