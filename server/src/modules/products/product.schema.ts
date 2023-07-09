import { isObjectIdOrHexString } from 'mongoose'
import { z } from 'zod'

const payload = {
	body: z.object({
		name: z
			.string({
				required_error: 'Product name is required',
			})
			.trim(),
		sku: z.string().trim().optional(),
		slug: z
			.string({
				required_error: 'Product slug is required',
			})
			.trim(),
		price: z.number({
			required_error: 'Product price is required',
		}),
		description: z
			.string({
				required_error: 'Product description is required',
			})
			.min(10, 'Product description must be atleast 10 characters long')
			.trim(),
		inventory: z.object({
			managed: z.boolean().default(false),
			available: z.number().optional().default(0),
		}),
		categories: z
			.array(
				z
					.string()
					.trim()
					.refine(val => isObjectIdOrHexString(val), {
						message: 'Id is not valid',
					})
			)
			.nonempty('Categories is required'),
		active: z.boolean().optional().default(true),
		variants: z.array(z.string().trim()).default([]),
		assets: z
			.array(
				z.object({
					url: z.string(),
				})
			)
			.nonempty('You need atleast one image for this product'),
		meta: z
			.array(z.object({ name: z.string().trim(), value: z.string().trim() }))
			.default([]),
	}),
}

const params = {
	params: z.object({
		id: z
			.string({
				required_error: 'Product id is required',
			})
			.trim()
			.refine(val => isObjectIdOrHexString(val), {
				message: 'Id is not valid',
			}),
	}),
}

export const createProductSchema = z.object({
	...payload,
})

// type Delete = z.infer<typeof createProductSchema>

export const updateProductSchema = z.object({
	...payload,
	...params,
})

export const deleteProductSchema = z.object({
	...params,
})

export const getProductSchema = z.object({
	...params,
})

export const getAllProductsSchema = z.object({
	params: z.object({
		page: z
			.string({
				required_error: 'Page is required',
			})
			.default('1'),
	}),
})

export type CreateProductInput = z.TypeOf<typeof createProductSchema>['body']
export type UpdateProductInput = z.TypeOf<typeof updateProductSchema>
export type DeleteProductInput = z.TypeOf<typeof deleteProductSchema>['params']
export type GetProductInput = z.TypeOf<typeof getProductSchema>['params']
export type GetAllProductsInput = z.TypeOf<
	typeof getAllProductsSchema
>['params']
