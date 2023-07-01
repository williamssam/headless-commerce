import express from 'express'

const router = express.Router()

export default (): express.Router => {
	router.get('/healthcheck', (_, res) => res.sendStatus(200))

	// userRoutes(router)
	// websiteRoutes(router)

	return router
}
