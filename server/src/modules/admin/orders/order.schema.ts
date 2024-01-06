import { isObjectIdOrHexString } from 'mongoose'
import { z } from 'zod'

const payload = {
	body: z.object({
		customer: z.object({
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
			customer_ref: z.string().optional(),
		}),
		status: z.enum(['pending', 'shipped', 'cancelled']),
		payment_status: z.enum(['paid', 'not_paid', 'refunded']),
		fulfillment_status: z.enum(['fulfilled', 'not_fulfilled', 'returned']),
		shipping: z.object({
			address: z
				.string({
					required_error: 'Address is required',
				})
				.trim(),
			town_city: z
				.string({
					required_error: 'Town city is required',
				})
				.trim(),
			country: z
				.string({
					required_error: 'Country is required',
				})
				.trim(),
			state: z
				.string({
					required_error: 'State is required',
				})
				.trim(),
			nearest_landmark: z.string({
				required_error: 'Nearest landmark is required',
			}),
		}),
		carrier: z.object({
			name: z
				.string({
					required_error: 'Carrier name is required',
				})
				.trim()
				.optional(),
			phone: z
				.string({
					required_error: 'Carrier phone is required',
				})
				.trim()
				.optional(),
		}),
		line_items: z.array(
			z.object({
				product_id: z
					.string({
						required_error: 'Product id is required',
					})
					.trim()
					.refine(val => isObjectIdOrHexString(val), {
						message: 'Id is not valid',
					}),
				quantity: z.number({
					required_error: 'Quantity is required',
				}),
			})
		),
		order_total_value: z.number({
			required_error: 'Order value is required',
		}),
		payment_info: z.object({
			trans_ref: z
				.string({
					required_error: 'Transaction reference is required',
				})
				.trim(),
			paid_on: z
				.string({
					required_error: 'Paid on date is required',
				})
				.trim(),
			paid_amount: z.number({
				required_error: 'Paid amount is required',
			}),
			paid_with: z.enum(['card', 'transfer'], {
				required_error: 'Paid with is required',
			}),
			payment_gateway: z
				.string({
					required_error: 'Payment gateway is required',
				})
				.trim()
				.optional(),
		}),
		shipped_on: z.string().optional(),
		delivered_on: z.string().optional(),
		delivery_instruction: z.string().optional(),
	}),
}

const params = {
	params: z.object({
		id: z
			.string({
				required_error: 'Order id is required',
			})
			.trim()
			.refine(val => isObjectIdOrHexString(val), {
				message: 'Id is not valid',
			}),
	}),
}

export const createOrderSchema = z.object({
	...payload,
})
export const updateOrderSchema = z.object({
	...payload,
	...params,
})
export const getOrderSchema = z.object({
	...params,
})
export const cancelOrderSchema = z.object({
	...params,
})
export const refundOrderSchema = z.object({
	...params,
})
export const getAllOrdersSchema = z.object({
	params: z.object({
		page: z
			.string({
				required_error: 'Page is required',
			})
			.default('1'),
		status: z.enum(['pending', 'shipped', 'cancelled']).optional(),
		payment_status: z.enum(['paid', 'not_paid', 'refunded']).optional(),
		fulfillment_status: z
			.enum(['fulfilled', 'not_fulfilled', 'returned'])
			.optional(),
		date: z.string().optional(),
		customer_email: z.string().email().optional(),
		customer_name: z.string().optional(),
	}),
})

type CreateOrderInput = z.TypeOf<typeof createOrderSchema>['body']
type UpdateOrderInput = z.TypeOf<typeof updateOrderSchema>
type GetOrderInput = z.TypeOf<typeof getOrderSchema>['params']
type CancelOrderInput = z.TypeOf<typeof cancelOrderSchema>['params']
type RefundOrderInput = z.TypeOf<typeof refundOrderSchema>['params']
type GetAllOrdersInput = z.TypeOf<typeof getAllOrdersSchema>['params']

export type {
	CancelOrderInput,
	CreateOrderInput,
	GetAllOrdersInput,
	GetOrderInput,
	RefundOrderInput,
	UpdateOrderInput,
}
