import express from 'express'
import categoryRoutes from './modules/categories/category.routes'
import discountsRoutes from './modules/discounts/discounts.routes'
import productRoutes from './modules/products/product.routes'
import userRoutes from './modules/user/user.routes'
import variantRoutes from './modules/variants/variant.routes'

const router = express.Router()

export default (): express.Router => {
	router.get('/healthcheck', (_, res) => res.sendStatus(200))

	userRoutes(router)
	productRoutes(router)
	variantRoutes(router)
	categoryRoutes(router)
	discountsRoutes(router)
	// websiteRoutes(router)

	return router
}
