import { NextFunction, Request, Response } from 'express'
import { HttpStatusCode } from '../../../@types/types'
import { ApiError } from '../../../exceptions/apiError'
import { findProduct, findProductById } from '../products/product.service'
import {
	CreateProductVariantInput,
	DeleteProductVariantInput,
	GetProductVariantInput,
	GetProductVariantsInput,
	UpdateProductVariantInput,
} from './variant.schema'
import {
	createVariant,
	deleteVariant,
	findAndUpdateVariant,
	findVariantById,
} from './variant.service'

export const createProductVariantHandler = async (
	req: Request<
		CreateProductVariantInput['params'],
		{},
		CreateProductVariantInput['body']
	>,
	res: Response,
	next: NextFunction
) => {
	try {
		const { product_id } = req.params
		const { name } = req.body
		// TODO: before creating variant, also check if product variant already contain that variant option name (nte: not group name)
		const product = await findProductById(product_id)
		if (!product) {
			throw new ApiError(
				'Product does not exists!',
				false,
				HttpStatusCode.BAD_REQUEST
			)
		}

		// FIX: This will not work cos we are storing the variant id's on the product document not the name
		// if (!product.variants.includes(name)) {
		// 	throw new ApiError(
		// 		'Product already has variant with this name!',
		// 		false,
		// 		HttpStatusCode.BAD_REQUEST
		// 	)
		// }

		// TODO: this check is still not working as expected, need to check if variant already exists
		const productHasVariant = await findProduct({ 'variants.name': name })
		if (productHasVariant) {
			throw new ApiError(
				'Product already has variant with this name!',
				false,
				HttpStatusCode.BAD_REQUEST
			)
		}

		// const variantOptionExists = await findProduct({'variants.options.name': options.})

		const variant = await createVariant(req.body)
		product.variants.push(variant)
		await product.save()

		return res.status(HttpStatusCode.CREATED).json({
			success: true,
			message: 'Variant created successfully!',
			data: variant,
		})
	} catch (error) {
		return next(error)
	}
}

export const updateProductVariantHandler = async (
	req: Request<
		UpdateProductVariantInput['params'],
		{},
		UpdateProductVariantInput['body']
	>,
	res: Response,
	next: NextFunction
) => {
	try {
		const { product_id, variant_id } = req.params

		const product = await findProductById(product_id)
		if (!product) {
			throw new ApiError(
				'Product does not exist',
				false,
				HttpStatusCode.BAD_REQUEST
			)
		}

		if (!product.variants.includes(variant_id)) {
			throw new ApiError(
				'Product variant does not exist',
				false,
				HttpStatusCode.BAD_REQUEST
			)
		}

		const variant = await findAndUpdateVariant(
			{ _id: variant_id },
			{ ...req.body },
			{ new: true }
		)

		return res.status(HttpStatusCode.OK).json({
			success: true,
			message: 'Category updated successfully',
			data: variant,
		})
	} catch (error) {
		return next(error)
	}
}

export const deleteProductVariantHandler = async (
	req: Request<DeleteProductVariantInput>,
	res: Response,
	next: NextFunction
) => {
	try {
		const { product_id, variant_id } = req.params

		const product = await findProductById(product_id)
		if (!product) {
			throw new ApiError(
				'Product does not exist',
				false,
				HttpStatusCode.BAD_REQUEST
			)
		}

		if (!product.variants.includes(variant_id)) {
			throw new ApiError(
				'Product variant does not exist',
				false,
				HttpStatusCode.BAD_REQUEST
			)
		}

		await deleteVariant({ _id: variant_id })
		return res.status(HttpStatusCode.OK).json({
			success: true,
			message: 'Product variant deleted successfully',
			data: null,
		})
	} catch (error) {
		return next(error)
	}
}

export const getProductVariantHandler = async (
	req: Request<GetProductVariantInput>,
	res: Response,
	next: NextFunction
) => {
	try {
		const { product_id, variant_id } = req.params

		const product = await findProductById(product_id)
		if (!product) {
			throw new ApiError(
				'Product does not exist',
				false,
				HttpStatusCode.BAD_REQUEST
			)
		}

		if (!product.variants.includes(variant_id)) {
			throw new ApiError(
				'Product variant does not exist',
				false,
				HttpStatusCode.BAD_REQUEST
			)
		}

		// also check if variant model contains that variant id before returing the variant

		const variant = await findVariantById(variant_id)
		return res.status(HttpStatusCode.OK).json({
			success: true,
			message: 'Product variant retrieved successfully',
			data: variant,
		})
	} catch (error) {
		return next(error)
	}
}

export const getAllProductVariantsHandler = async (
	req: Request<GetProductVariantsInput>,
	res: Response,
	next: NextFunction
) => {
	try {
		const { product_id } = req.params

		const product = await findProductById(product_id).populate('variants')
		if (!product) {
			throw new ApiError(
				'Product does not exist',
				false,
				HttpStatusCode.BAD_REQUEST
			)
		}

		return res.status(HttpStatusCode.OK).json({
			success: true,
			message: 'Product variants were retrieved successfully!',
			data: product?.variants,
		})
	} catch (error) {
		return next(error)
	}
}
