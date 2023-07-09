import { Router } from 'express'
import { config } from '../../config'
import { validateResource } from '../../middlewares/validateResource'
import {
	createDiscountHander,
	deleteDiscountHandler,
	getAllDiscountsHandler,
	getDiscountHandler,
	updateDiscountHandler,
} from './discounts.controller'
import {
	createDiscountSchema,
	deleteDiscountSchema,
	getAllDiscountsSchema,
	getDiscountSchema,
	updateDiscountSchema,
} from './discounts.schema'

export default (router: Router) => {
	/**
	 * @description Create new discount endpoint
	 */
	router.post(
		`${config.routePrefix}/discount`,
		validateResource(createDiscountSchema),
		createDiscountHander
	)

	/**
	 * @description Update discount endpoint
	 */
	router.put(
		`${config.routePrefix}/discount/:id`,
		validateResource(updateDiscountSchema),
		updateDiscountHandler
	)

	/**
	 * @description Delete discount endpoint
	 */
	router.delete(
		`${config.routePrefix}/discount/:id`,
		validateResource(deleteDiscountSchema),
		deleteDiscountHandler
	)

	/**
	 * @description Fetch discount endpoint
	 */
	router.get(
		`${config.routePrefix}/discount/:id`,
		validateResource(getDiscountSchema),
		getDiscountHandler
	)

	/**
	 * @description Fetch all discounts endpoint
	 */
	router.get(
		`${config.routePrefix}/discounts`,
		validateResource(getAllDiscountsSchema),
		getAllDiscountsHandler
	)
}
