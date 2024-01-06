import type { Router } from 'express'
import { config } from '../../../config'
import { validateResource } from '../../../middlewares/validateResource'
import { getAllOrdersHandler } from './order.controller'
import { getAllOrdersSchema } from './order.schema'

export default (router: Router) => {
	router.get(
		`${config.routePrefix}/orders`,
		validateResource(getAllOrdersSchema),
		getAllOrdersHandler
	)
}
