import { NextFunction, Request, Response } from 'express'
import { HttpStatusCode } from '../../@types/types'
import { ApiError } from '../../exceptions/apiError'
import {
	CreateCategoryInput,
	DeleteCategoryInput,
	GetAllCategoriesInput,
	GetCategoryInput,
	UpdateCategoryInput,
} from './category.schema'
import {
	createCategory,
	deleteCategory,
	findAndUpdateCategory,
	findCategory,
	findCategoryById,
	getAllCategories,
	getTotalCategory,
} from './category.service'

export const createCategoryHandler = async (
	req: Request<{}, {}, CreateCategoryInput>,
	res: Response,
	next: NextFunction
) => {
	try {
		const { name, slug } = req.body

		const categoryNameExits = await findCategory({ name })
		if (categoryNameExits) {
			throw new ApiError(
				'Category name already exists.',
				false,
				HttpStatusCode.BAD_REQUEST
			)
		}

		const categorySlugExits = await findCategory({ slug })
		if (categorySlugExits) {
			throw new ApiError(
				'A category with this slug already exits.',
				false,
				HttpStatusCode.BAD_REQUEST
			)
		}

		const category = await createCategory(req.body)
		return res.status(HttpStatusCode.CREATED).json({
			success: true,
			message: 'Category created successfully',
			data: category,
		})
	} catch (error) {
		return next(error)
	}
}

export const updateCategoryHandler = async (
	req: Request<UpdateCategoryInput['params'], {}, UpdateCategoryInput['body']>,
	res: Response,
	next: NextFunction
) => {
	try {
		const { id } = req.params

		const categoryExists = await findCategoryById(id)
		if (!categoryExists) {
			throw new ApiError(
				'Category not found!',
				false,
				HttpStatusCode.BAD_REQUEST
			)
		}

		const category = await findAndUpdateCategory(
			{ _id: id },
			{ ...req.body },
			{ new: true }
		)
		return res.status(HttpStatusCode.OK).json({
			success: true,
			message: 'Category updated successfully',
			data: category,
		})
	} catch (error) {
		return next(error)
	}
}

export const deleteCategoryHandler = async (
	req: Request<DeleteCategoryInput>,
	res: Response,
	next: NextFunction
) => {
	try {
		const { id } = req.params

		const categoryExists = await findCategoryById(id)
		if (!categoryExists) {
			throw new ApiError(
				'Category not found!',
				false,
				HttpStatusCode.BAD_REQUEST
			)
		}

		await deleteCategory({ _id: id })
		return res.status(HttpStatusCode.OK).json({
			success: true,
			message: 'Category deleted successfully',
			data: null,
		})
	} catch (error) {
		return next(error)
	}
}

export const getCategoryHandler = async (
	req: Request<GetCategoryInput>,
	res: Response,
	next: NextFunction
) => {
	try {
		const { id } = req.params

		const category = await findCategoryById(id)
		if (!category) {
			throw new ApiError(
				'Category not found!',
				false,
				HttpStatusCode.NOT_FOUND
			)
		}

		return res.status(HttpStatusCode.OK).json({
			success: true,
			message: 'Category retrieved successfully',
			data: category,
		})
	} catch (error) {
		return next(error)
	}
}

export const getAllCategoriesHandler = async (
	req: Request<GetAllCategoriesInput>,
	res: Response,
	next: NextFunction
) => {
	try {
		const page = parseInt(req.params.page as string) || 1

		const limit = 15
		const skip = (page - 1) * limit

		const categories = await getAllCategories({ skip, limit })
		const total = await getTotalCategory()

		return res.status(HttpStatusCode.OK).json({
			success: true,
			message: 'All categories were retrieved successfully!',
			data: categories,
			meta: {
				total,
				current_page: page,
				per_page: limit,
				total_pages: Math.ceil(total / limit),
				count: categories.length,
			},
		})
	} catch (error) {
		return next(error)
	}
}
