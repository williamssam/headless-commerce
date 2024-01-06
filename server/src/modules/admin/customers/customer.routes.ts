import type { Router } from 'express'
import { config } from '../../../config'
import { validateResource } from '../../../middlewares/validateResource'
import {
	createCustomerHandler,
	deleteCustomerHandler,
	getAllCustomersHandler,
	getCustomerHandler,
	updateCustomerHandler,
} from './customer.controller'
import {
	createCustomerSchema,
	deleteCustomerSchema,
	getAllCustomersSchema,
	getCustomerSchema,
	updateCustomerSchema,
} from './customer.schema'

export default (router: Router) => {
	/**
	 * @description Create new customer endpoint
	 */
	router.post(
		`${config.routePrefix}/customer`,
		validateResource(createCustomerSchema),
		createCustomerHandler
	)

	/**
	 * @description Update existing customer endpoint
	 */
	router.put(
		`${config.routePrefix}/customer/:id`,
		validateResource(updateCustomerSchema),
		updateCustomerHandler
	)

	/**
	 * @description Delete customer endpoint
	 */
	router.delete(
		`${config.routePrefix}/customer/:id`,
		validateResource(deleteCustomerSchema),
		deleteCustomerHandler
	)

	/**
	 * @description Get one customer endpoint
	 */
	router.get(
		`${config.routePrefix}/customer/:id`,
		validateResource(getCustomerSchema),
		getCustomerHandler
	)

	/**
	 * @description List all customers endpoint
	 */
	router.get(
		`${config.routePrefix}/customers`,
		validateResource(getAllCustomersSchema),
		getAllCustomersHandler
	)
}
