import { type Router } from 'express'
import multer from 'multer'
import { config } from '../../../config'
import { validateResource } from '../../../middlewares/validateResource'
import {
	createAsseteHandler,
	deleteAssetHandler,
	getAllAssetsHandler,
} from './assets.controller'
import { deleteAssetSchema } from './assets.schema'
const upload = multer({ dest: 'uploads/' })

export default (router: Router) => {
	/**
	 * @description Create new asset endpoint
	 */
	router.post(
		`${config.routePrefix}/asset`,
		upload.array('images'),
		createAsseteHandler
	)

	/**
	 * @description Delete asset endpoint
	 */
	router.delete(
		`${config.routePrefix}/asset/:id`,
		validateResource(deleteAssetSchema),
		deleteAssetHandler
	)

	/**
	 * @description Get all assets endpoint
	 */
	router.get(`${config.routePrefix}/assets`, getAllAssetsHandler)
}
