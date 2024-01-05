import { v2 as cloudinary, type UploadApiResponse } from 'cloudinary'
import type { NextFunction, Request, Response } from 'express'
import { HttpStatusCode } from '../../../@types/types'
import { config } from '../../../config'
import { ApiError } from '../../../exceptions/apiError'
import { DeleteAssetInput } from './assets.schema'
import {
	createAssets,
	deleteAsset,
	findAsset,
	getAllAssets,
	totalAssets,
} from './assets.service'

cloudinary.config({ ...config.cloudinary })

export const createAssetHandler = async (
	req: Request<{}, {}, { images: Express.Multer.File[] }>,
	res: Response,
	next: NextFunction
) => {
	try {
		const files = req.files
		if (!files) {
			throw new ApiError(
				'No image(s) provided!',
				false,
				HttpStatusCode.BAD_REQUEST
			)
		}

		// upload all images to cloudinary
		// @ts-expect-error
		const upload = files.map(async file => {
			const result = await cloudinary.uploader.upload(file.path, {
				overwrite: true,
				unique_filename: false,
				use_filename: true,
			})
			return result
		})
		const data = await Promise.all(upload)
		if (!data) {
			throw new ApiError(
				'Error uploading image(s), Please try again!',
				false,
				HttpStatusCode.BAD_REQUEST
			)
		}

		// if upload is successful, store image url and other data in database
		const toStore = data.map((item: UploadApiResponse) => ({
			public_id: item.public_id,
			url: item.secure_url,
			resource_type: item.resource_type,
		}))
		const assets = await createAssets(toStore)
		if (!assets) {
			throw new ApiError(
				'Error storing image(s)',
				false,
				HttpStatusCode.BAD_REQUEST
			)
		}

		return res.status(HttpStatusCode.OK).json({
			success: true,
			message: 'Image(s) uploaded successfully',
			data: assets,
		})
	} catch (error) {
		return next(error)
	}
}

export const deleteAssetHandler = async (
	req: Request<DeleteAssetInput>,
	res: Response,
	next: NextFunction
) => {
	try {
		const { id } = req.params
		const asset = await findAsset({ _id: id })
		if (!asset) {
			throw new ApiError(
				'Asset does not exist',
				false,
				HttpStatusCode.NOT_FOUND
			)
		}

		const removeAssetFromCloudinary = await cloudinary.uploader.destroy(
			asset.public_id,
			{
				resource_type: asset.resource_type,
			}
		)
		if (!removeAssetFromCloudinary) {
			throw new ApiError(
				'Error deleting asset',
				false,
				HttpStatusCode.BAD_REQUEST
			)
		}

		await deleteAsset(id)
		return res.status(HttpStatusCode.OK).json({
			success: true,
			message: 'Asset deleted successfully',
			data: null,
		})
	} catch (error) {
		return next(error)
	}
}

export const getAllAssetsHandler = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const page = parseInt(req.params.page as string) || 1

		const limit = 15
		const skip = (page - 1) * limit

		const assets = await getAllAssets({ skip, limit })
		const total = await totalAssets()
		return res.status(HttpStatusCode.OK).json({
			success: true,
			message: 'All assets retrieved successfully!',
			data: assets,
			meta: {
				total,
				current_page: page,
				per_page: limit,
				total_pages: Math.ceil(total / limit),
				count: assets.length,
			},
		})
	} catch (error) {
		return next(error)
	}
}
