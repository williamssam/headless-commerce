import { Router } from 'express'
import { config } from '../../../config'
import { validateResource } from '../../../middlewares/validateResource'
import {
	createCategoryHandler,
	deleteCategoryHandler,
	getAllCategoriesHandler,
	getCategoryHandler,
	updateCategoryHandler,
} from './category.controller'
import {
	createCategorySchema,
	deleteCategorySchema,
	getAllCategoriesSchema,
	getCategorySchema,
	updateCategorySchema,
} from './category.schema'

export default (router: Router) => {
	/**
	 * @description Create new category endpoint
	 */
	router.post(
		`${config.routePrefix}/category`,
		validateResource(createCategorySchema),
		createCategoryHandler
	)

	/**
	 * @description Update category endpoint
	 */
	router.put(
		`${config.routePrefix}/category/:id`,
		validateResource(updateCategorySchema),
		updateCategoryHandler
	)

	/**
	 * @description Delete category endpoint
	 */
	router.delete(
		`${config.routePrefix}/category/:id`,
		validateResource(deleteCategorySchema),
		deleteCategoryHandler
	)

	/**
	 * @description Fetch one category endpoint
	 */
	router.get(
		`${config.routePrefix}/category/:id`,
		validateResource(getCategorySchema),
		getCategoryHandler
	)

	/**
	 * @description Fetch all categories endpoint
	 */
	router.get(
		`${config.routePrefix}/categories`,
		validateResource(getAllCategoriesSchema),
		getAllCategoriesHandler
	)
}
