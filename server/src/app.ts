import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
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
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(routes())
app.use(errorHandler)

app.listen(config.port, async () => {
	await connectToDB()
	console.log(`Server is running on port 'http:localhost:${config.port}'`)
})
