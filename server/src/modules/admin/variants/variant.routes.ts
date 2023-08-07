import { Router } from 'express'
import { config } from '../../../config'
import { validateResource } from '../../../middlewares/validateResource'
import {
	createProductVariantHandler,
	deleteProductVariantHandler,
	getAllProductVariantsHandler,
	getProductVariantHandler,
	updateProductVariantHandler,
} from './variant.controller'
import {
	createProductVariantSchema,
	deleteProductVariantSchema,
	getProductVariantSchema,
	getProductVariantsSchema,
	updateProductVariantSchema,
} from './variant.schema'

/* Product variants routes */
export default (router: Router) => {
	/**
	 * @description Create variant for product
	 */
	router.post(
		`${config.routePrefix}/product/:product_id/variant`,
		validateResource(createProductVariantSchema),
		createProductVariantHandler
	)

	/**
	 * @description Update variant for product
	 */
	router.post(
		`${config.routePrefix}/product/:product_id/variant/:variant_id`,
		validateResource(updateProductVariantSchema),
		updateProductVariantHandler
	)

	/**
	 * @description Delete variant for product
	 */
	router.delete(
		`${config.routePrefix}/product/:product_id/variant/:variant_id`,
		validateResource(deleteProductVariantSchema),
		deleteProductVariantHandler
	)

	/**
	 * @description fetch one variant from product
	 */
	router.get(
		`${config.routePrefix}/product/:product_id/variant/:variant_id`,
		validateResource(getProductVariantSchema),
		getProductVariantHandler
	)

	/**
	 * @description fetch product variants endpoint
	 */
	router.get(
		`${config.routePrefix}/product/:product_id/variants`,
		validateResource(getProductVariantsSchema),
		getAllProductVariantsHandler
	)
}
