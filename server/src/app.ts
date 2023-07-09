const compression = require('compression')
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
import { config } from './config'
import errorHandler from './middlewares/errorHandler'
import routes from './routes'
import { connectToDB } from './utils/connectToDB'
import { corsOptions } from './utils/corsOptions'

const app = express()

// middlewares
app.use(
	cors({
		origin: corsOptions,
	})
)
app.use(cookieParser())
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(routes())
app.use(errorHandler)

// mongoose default to remove both "_id" and version number from response
mongoose.set('toJSON', {
	virtuals: true,
	transform: (doc, converted) => {
		delete converted._id
		delete converted.__v
	},
})

app.listen(config.port, async () => {
	await connectToDB()
	console.log(`Server is running on port 'http://localhost:${config.port}'`)
})
