import 'dotenv/config'

export const config = {
	port: process.env.PORT as string,
	routePrefix: '/api/v1',
	mongoUri: process.env.MONGO_URI as string,
	smtp: {
		user: 'project.1',
		pass: 'secret.1',
		host: '127.0.0.1',
		port: 1025,
		secure: false,
	},
	jwt: {
		privateKey: process.env.JWT_PRIVATE_KEY as string,
		publicKey: process.env.JWT_PUBLIC_KEY as string,
		expiresIn: process.env.JWT_EXPIRES_IN as string,
	},
}
