import type { NextFunction, Request, Response } from 'express'
import { HttpStatusCode } from '../../../@types/types'
import { ApiError } from '../../../exceptions/apiError'
import type { CustomerInput } from './customer.model'
import type {
	DeleteCustomerInput,
	GetAllCustomersInput,
	GetCustomerInput,
	UpdateCustomerInput,
} from './customer.schema'
import {
	createCustomer,
	deleteCustomer,
	findAllCustomers,
	findAndUpdateCustomer,
	findCustomer,
	findCustomerById,
	getTotalCustomer,
} from './customer.service'

export const createCustomerHandler = async (
	req: Request<{}, {}, CustomerInput>,
	res: Response,
	next: NextFunction
) => {
	try {
		const { email } = req.body
		const customerExists = await findCustomer({ email })

		if (customerExists) {
			throw new ApiError(
				'Customer already exists!',
				false,
				HttpStatusCode.BAD_REQUEST
			)
		}

		const userId = res.locals.user.id

		const customer = await createCustomer({
			...req.body,
			owner_id: userId,
		})
		return res.status(201).json({
			success: true,
			message: 'Customer created successfully!',
			data: customer,
		})
	} catch (error) {
		return next(error)
	}
}

export const updateCustomerHandler = async (
	req: Request<UpdateCustomerInput['params'], {}, UpdateCustomerInput['body']>,
	res: Response,
	next: NextFunction
) => {
	try {
		const { id } = req.params
		const customer = await findCustomerById(id)
		if (!customer) {
			throw new ApiError(
				'Customer does not exists!',
				false,
				HttpStatusCode.NOT_FOUND
			)
		}

		const updatedCustomer = await findAndUpdateCustomer(
			{ _id: id },
			{ ...req.body },
			{ new: true }
		)

		return res.status(HttpStatusCode.OK).json({
			success: true,
			message: 'Customer updated successfully!',
			data: updatedCustomer,
		})
	} catch (error) {
		return next(error)
	}
}

export const getCustomerHandler = async (
	req: Request<GetCustomerInput>,
	res: Response,
	next: NextFunction
) => {
	try {
		const { id } = req.params
		const customer = await findCustomerById(id)

		if (!customer) {
			throw new ApiError(
				'Customer not found!',
				false,
				HttpStatusCode.NOT_FOUND
			)
		}

		return res.status(HttpStatusCode.OK).json({
			success: true,
			message: 'Customer fetched successfully!',
			data: customer,
		})
	} catch (error) {
		return next(error)
	}
}

export const getAllCustomersHandler = async (
	req: Request<GetAllCustomersInput>,
	res: Response,
	next: NextFunction
) => {
	try {
		const page = parseInt(req.params.page as string) || 1

		const limit = 15
		const skip = (page - 1) * limit

		const customers = await findAllCustomers({
			skip,
			limit,
		})
		const total = await getTotalCustomer()

		return res.status(HttpStatusCode.OK).json({
			success: true,
			message: 'Customers fetched successfully!',
			data: customers,
			meta: {
				total,
				current_page: page,
				per_page: limit,
				total_pages: Math.ceil(total / limit),
				count: customers.length,
			},
		})
	} catch (error) {
		return next(error)
	}
}

export const deleteCustomerHandler = async (
	req: Request<DeleteCustomerInput>,
	res: Response,
	next: NextFunction
) => {
	try {
		const { id } = req.params
		const customer = await findCustomerById(id)
		if (!customer) {
			throw new ApiError(
				'Customer not found!',
				false,
				HttpStatusCode.NOT_FOUND
			)
		}

		await deleteCustomer({ _id: id })
		return res.status(HttpStatusCode.OK).json({
			success: true,
			message: 'Customer deleted successfully!',
		})
	} catch (error) {
		return next(error)
	}
}
