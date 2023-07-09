import { NextFunction, Request, Response } from 'express'
import { HttpStatusCode } from '../../@types/types'
import { ApiError } from '../../exceptions/apiError'
import {
	CreateDiscountInput,
	DeleteDiscountInput,
	GetAllDiscountsInput,
	GetDiscountInput,
	UpdateDiscountInput,
} from './discounts.schema'
import {
	createDiscount,
	deleteDiscount,
	findAndUpdateDiscount,
	findDiscount,
	getAllDiscounts,
	getTotalDiscount,
} from './discounts.service'

export const createDiscountHander = async (
	req: Request<{}, {}, CreateDiscountInput>,
	res: Response,
	next: NextFunction
) => {
	try {
		const { code } = req.body

		const discountCodeExists = await findDiscount({ code })
		if (discountCodeExists) {
			throw new ApiError(
				'Discount with this code already exists',
				false,
				HttpStatusCode.BAD_REQUEST
			)
		}

		const discount = await createDiscount(req.body)
		return res.status(HttpStatusCode.CREATED).json({
			success: true,
			message: 'Discount created successfully',
			data: discount,
		})
	} catch (error) {
		return next(error)
	}
}

export const updateDiscountHandler = async (
	req: Request<UpdateDiscountInput['params'], {}, UpdateDiscountInput['body']>,
	res: Response,
	next: NextFunction
) => {
	const { id } = req.params

	const discountExists = await findDiscount({ id })
	if (!discountExists) {
		throw new ApiError(
			'Discount does not exist',
			false,
			HttpStatusCode.BAD_REQUEST
		)
	}

	const discount = await findAndUpdateDiscount(
		{ id },
		{ ...req.body },
		{ new: true }
	)
	return res.status(HttpStatusCode.OK).json({
		success: true,
		message: 'Discount updated successfully',
		data: discount,
	})
}

export const deleteDiscountHandler = async (
	req: Request<DeleteDiscountInput>,
	res: Response,
	next: NextFunction
) => {
	try {
		const { id } = req.params

		const discount = await findDiscount({ id })
		if (!discount) {
			throw new ApiError(
				'Discount does not exist',
				false,
				HttpStatusCode.BAD_REQUEST
			)
		}

		await deleteDiscount({ id })
		return res.status(HttpStatusCode.OK).json({
			success: true,
			message: 'Discount deleted successfully',
			data: null,
		})
	} catch (error) {
		return next(error)
	}
}

export const getDiscountHandler = async (
	req: Request<GetDiscountInput>,
	res: Response,
	next: NextFunction
) => {
	try {
		const { id } = req.params

		const discount = await findDiscount({ id })
		if (!discount) {
			throw new ApiError(
				'Discount does not exist',
				false,
				HttpStatusCode.BAD_REQUEST
			)
		}

		return res.status(HttpStatusCode.OK).json({
			success: true,
			message: 'Discount fetched successfully',
			data: discount,
		})
	} catch (error) {
		return next(error)
	}
}

export const getAllDiscountsHandler = async (
	req: Request<GetAllDiscountsInput>,
	res: Response,
	next: NextFunction
) => {
	try {
		const page = parseInt(req.params.page as string) || 1

		const limit = 15
		const skip = (page - 1) * limit

		const discounts = await getAllDiscounts({ skip, limit })
		const total = await getTotalDiscount()

		return res.status(HttpStatusCode.OK).json({
			success: true,
			message: 'All discounts retrieved successfully!',
			data: discounts,
			meta: {
				total,
				current_page: page,
				per_page: limit,
				total_pages: Math.ceil(total / limit),
				count: discounts.length,
			},
		})
	} catch (error) {
		return next(error)
	}
}
