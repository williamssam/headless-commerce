import { customAlphabet } from 'nanoid'
import { z } from 'zod'

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10)

const payload = {
	body: z
		.object({
			code: z
				.string({
					required_error: 'Discount code is required',
				})
				.trim()
				.default(''),
			type: z.enum(['fixed', 'percentage']),
			value: z.number({
				required_error: 'Value is required',
			}),
			limit_quantity: z
				.boolean({
					required_error: 'Value is required',
				})
				.default(false),
			quantity: z.number({
				required_error: 'Quantity is required',
			}),
			starts_on: z
				.string({
					required_error: 'Date to start discount is required',
				})
				.trim()
				.datetime('Invalid date'),
			expires_on: z
				.string({
					required_error: 'Date to end discount is required',
				})
				.trim()
				.datetime('Invalid date'),
		})
		.superRefine((val, ctx) => {
			if (val.type === 'percentage' && val.value > 100) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'Percentage discount cannot be greater than 100',
					path: ['value'],
				})
			}
		}),
}

const params = {
	params: z.object({
		id: z
			.string({
				required_error: 'Discount id is required',
			})
			.trim(),
	}),
}

export const createDiscountSchema = z.object({
	...payload,
})
export const updateDiscountSchema = z.object({
	...payload,
	...params,
})
export const deleteDiscountSchema = z.object({
	...params,
})
export const getDiscountSchema = z.object({
	...params,
})
export const getAllDiscountsSchema = z.object({
	params: z.object({
		page: z
			.string({
				required_error: 'Page is required',
			})
			.default('1'),
	}),
})

export type CreateDiscountInput = z.TypeOf<typeof createDiscountSchema>['body']
export type UpdateDiscountInput = z.TypeOf<typeof updateDiscountSchema>
export type DeleteDiscountInput = z.TypeOf<
	typeof deleteDiscountSchema
>['params']
export type GetDiscountInput = z.TypeOf<typeof getDiscountSchema>['params']
export type GetAllDiscountsInput = z.TypeOf<
	typeof getAllDiscountsSchema
>['params']
