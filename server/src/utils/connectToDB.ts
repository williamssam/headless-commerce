import mongoose from 'mongoose'
import { config } from '../config'
import log from './logger'

export const connectToDB = async () => {
	try {
		await mongoose.connect(config.mongoUri)
		log.info('Connected to DB')
	} catch (error) {
		log.error('Could not connect to DB')
		console.log('connect error:', error)
		process.exit(1)
	}
}
