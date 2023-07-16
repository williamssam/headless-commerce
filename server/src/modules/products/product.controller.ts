import { NextFunction, Request, Response } from 'express'
import { HttpStatusCode } from '../../@types/types'
import { ApiError } from '../../exceptions/apiError'
import {
	findAndUpdateManyCategory,
	findCategory,
} from '../categories/category.service'
import { deleteManyVariants } from '../variants/variant.service'
import {
	CreateProductInput,
	DeleteProductInput,
	GetAllProductsInput,
	GetProductInput,
	UpdateProductInput,
} from './product.schema'
import {
	createProduct,
	deleteProduct,
	findAllProducts,
	findAndUpdateProduct,
	findProduct,
	findProductById,
	getTotalProducts,
} from './product.service'

export const createProductHandler = async (
	req: Request<{}, {}, CreateProductInput>,
	res: Response,
	next: NextFunction
) => {
	try {
		/*
			4. increate the product count in category document with the id passed
			5. populate related products*
			6. populate the discount field*
			7. fix the "conditionals" field
		*/
		const { slug, inventory, active, categories } = req.body
		const productWithSlugExists = await findProduct({ slug })
		if (productWithSlugExists) {
			throw new ApiError(
				'Product with this slug already exist',
				false,
				HttpStatusCode.BAD_REQUEST
			)
		}

		// check if all id passed to categories exists
		const categoryExists = await findCategory({ _id: categories })
		if (!categoryExists) {
			throw new ApiError(
				'Category not found!',
				false,
				HttpStatusCode.BAD_REQUEST
			)
		}

		// TODO: check if all id passed to variants exists

		const product = await createProduct(req.body)
		product.$set({
			'conditionals.is_active':
				active === undefined || active ? true : false,
			'conditionals.is_inventory_managed': inventory.managed ? true : false,
			'conditionals.is_out_of_stock':
				inventory.managed && inventory.available === 0 ? true : false,
		})
		// update products number on category after creating product
		await findAndUpdateManyCategory(
			{ _id: product.categories },
			{ $inc: { products: 1 } }
		)

		return res.status(HttpStatusCode.CREATED).json({
			success: true,
			message: 'Product created successfully!',
			data: product,
		})
	} catch (error) {
		return next(error)
	}
}

export const updateProductHandler = async (
	req: Request<UpdateProductInput['params'], {}, UpdateProductInput['body']>,
	res: Response,
	next: NextFunction
) => {
	try {
		const { id } = req.params
		const { slug } = req.body

		const productExists = await findProductById(id)
		if (!productExists) {
			throw new ApiError(
				'Product not found!',
				false,
				HttpStatusCode.BAD_REQUEST
			)
		}

		const prodcutWithSlug = await findProduct({ slug })
		if (prodcutWithSlug) {
			throw new ApiError(
				'Product with slug already exists!',
				false,
				HttpStatusCode.BAD_REQUEST
			)
		}

		const product = await findAndUpdateProduct(
			{ _id: id },
			{ ...req.body },
			{ new: true }
		)
		return res.status(HttpStatusCode.OK).json({
			success: true,
			message: 'Product updated successfully',
			data: product,
		})
	} catch (error) {
		return next(error)
	}
}

export const deleteProductHandler = async (
	req: Request<DeleteProductInput>,
	res: Response,
	next: NextFunction
) => {
	try {
		const { id } = req.params

		const product = await findProductById(id)
		if (!product) {
			throw new ApiError(
				'Product not found!',
				false,
				HttpStatusCode.BAD_REQUEST
			)
		}

		await deleteProduct({ _id: id })
		await deleteManyVariants({ _id: product.variants })

		// decrease products number on category after deleting product
		await findAndUpdateManyCategory(
			{ _id: product.categories },
			{ $inc: { products: -1 } }
		)

		return res.status(HttpStatusCode.OK).json({
			success: true,
			message: 'Product deleted successfully',
			data: null,
		})
	} catch (error) {
		return next(error)
	}
}

export const getProductHandler = async (
	req: Request<GetProductInput>,
	res: Response,
	next: NextFunction
) => {
	try {
		const { id } = req.params

		const product = await findProductById(id).populate(
			'categories',
			'id name slug'
		)
		if (!product) {
			throw new ApiError(
				'Product does not exist',
				false,
				HttpStatusCode.BAD_REQUEST
			)
		}

		return res.status(HttpStatusCode.OK).json({
			success: true,
			message: 'Product retrieved successfully',
			data: product,
		})
	} catch (error) {
		return next(error)
	}
}

export const getAllProductsHandler = async (
	req: Request<GetAllProductsInput>,
	res: Response,
	next: NextFunction
) => {
	try {
		/*
			Add ability to filter products based on certain conditions like "category slug", "query: permalink and name", "price: higher or lower than price passsed", "by active or inactive product", "by inventory.managed", "sort by: id, name, created_at, updated_at, price", "sort direction: ascending or descending"
		*/
		const page = parseInt(req.params.page as string) || 1

		const limit = 15
		const skip = (page - 1) * limit

		const products = await findAllProducts({ skip, limit })
		const total = await getTotalProducts()

		return res.status(HttpStatusCode.OK).json({
			success: true,
			message: 'All products were retrieved successfully!',
			data: products,
			meta: {
				total,
				current_page: page,
				per_page: limit,
				total_pages: Math.ceil(total / limit),
				count: products.length,
			},
		})
	} catch (error) {
		return next(error)
	}
}
