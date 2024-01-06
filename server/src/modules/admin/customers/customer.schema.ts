import { isObjectIdOrHexString } from 'mongoose'
import { z } from 'zod'

const payload = {
	body: z.object({
		firstname: z
			.string({
				required_error: 'Firstname is required',
			})
			.trim(),
		lastname: z
			.string({
				required_error: 'Lastname is required',
			})
			.trim(),
		email: z
			.string({
				required_error: 'Email is required',
			})
			.email('Email is invalid')
			.trim(),
		phone: z
			.string({
				required_error: 'Phone number is required',
			})
			.trim(),
	}),
}

const params = {
	params: z.object({
		id: z
			.string({
				required_error: 'Customer id is required',
			})
			.trim()
			.refine(val => isObjectIdOrHexString(val), {
				message: 'Id is not valid',
			}),
	}),
}

export const createCustomerSchema = z.object({
	...payload,
})
export const updateCustomerSchema = z.object({
	...payload,
	...params,
})
export const getCustomerSchema = z.object({
	...params,
})
export const deleteCustomerSchema = z.object({
	...params,
})
export const getAllCustomersSchema = z.object({
	params: z.object({
		page: z
			.string({
				required_error: 'Page is required',
			})
			.default('1'),
	}),
})

type CreateCustomerInput = z.TypeOf<typeof createCustomerSchema>['body']
type UpdateCustomerInput = z.TypeOf<typeof updateCustomerSchema>
type GetCustomerInput = z.TypeOf<typeof getCustomerSchema>['params']
type DeleteCustomerInput = z.TypeOf<typeof deleteCustomerSchema>['params']
type GetAllCustomersInput = z.TypeOf<typeof getAllCustomersSchema>['params']

export type {
	CreateCustomerInput,
	DeleteCustomerInput,
	GetAllCustomersInput,
	GetCustomerInput,
	UpdateCustomerInput,
}
