import { Router } from 'express'
import { config } from '../../../config'
import { validateResource } from '../../../middlewares/validateResource'
import {
	createProductHandler,
	deleteProductHandler,
	getAllProductsHandler,
	getProductHandler,
	updateProductHandler,
} from './product.controller'
import {
	createProductSchema,
	deleteProductSchema,
	getAllProductsSchema,
	getProductSchema,
	updateProductSchema,
} from './product.schema'

export default (router: Router) => {
	/**
	 * @description Create new product endpoint
	 */
	router.post(
		`${config.routePrefix}/product`,
		validateResource(createProductSchema),
		createProductHandler
	)

	/**
	 * @description Update product endpoint
	 */
	router.put(
		`${config.routePrefix}/product/:id`,
		validateResource(updateProductSchema),
		updateProductHandler
	)

	/**
	 * @description Delete product endpoint
	 */
	router.delete(
		`${config.routePrefix}/product/:id`,
		validateResource(deleteProductSchema),
		deleteProductHandler
	)

	/**
	 * @description Fetch one product endpoint
	 */
	router.get(
		`${config.routePrefix}/product/:id`,
		validateResource(getProductSchema),
		getProductHandler
	)

	/**
	 * @description Fetch all products endpoint
	 */
	router.get(
		`${config.routePrefix}/products`,
		validateResource(getAllProductsSchema),
		getAllProductsHandler
	)
}
