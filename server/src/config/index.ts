import 'dotenv/config'

export const config = {
	port: process.env.PORT as string,
	routePrefix: '/api/v1',
	mongoUri: process.env.MONGO_URI as string,
	smtp: {
		user: 'project.2',
		pass: 'secret.2',
		host: '127.0.0.1',
		port: 1025,
		secure: false,
	},
	jwt: {
		privateKey: process.env.JWT_PRIVATE_KEY as string,
		publicKey: process.env.JWT_PUBLIC_KEY as string,
		expiresIn: process.env.JWT_EXPIRES_IN as string,
	},
	client_url: process.env.CLIENT_URL,
	api_url: process.env.API_URL,
	cloudinary: {
		cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
		api_key: process.env.CLOUDINARY_API_KEY,
		api_secret: process.env.CLOUDINARY_API_SECRET,
		secure: true,
	},
}
