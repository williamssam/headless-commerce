import { isObjectIdOrHexString } from 'mongoose'
import { z } from 'zod'

const payload = {
	body: z.object({
		name: z
			.string({
				required_error: 'Category name is required',
			})
			.trim(),
		options: z.array(
			z.object({
				name: z
					.string({
						required_error: 'Option name is required',
					})
					.trim(),
				price: z.number().optional(),
				quantity: z.number().optional(),
				sku: z.string().trim().optional(),
				image_url: z.string().trim().optional(),
			})
		),
	}),
}

const product_id = z
	.string({
		required_error: 'Product id is required',
	})
	.trim()
	.refine(val => isObjectIdOrHexString(val), {
		message: 'Id is not valid',
	})
const variant_id = z
	.string({
		required_error: 'Group id is required',
	})
	.trim()
	.refine(val => isObjectIdOrHexString(val), {
		message: 'Id is not valid',
	})

export const createProductVariantSchema = z.object({
	...payload,
	params: z.object({ product_id }),
})

export const updateProductVariantSchema = z.object({
	...payload,
	params: z.object({ product_id, variant_id }),
})

export const deleteProductVariantSchema = z.object({
	params: z.object({ product_id, variant_id }),
})

// type Delete = z.infer<typeof deleteVariantSchema>

export const getProductVariantSchema = z.object({
	params: z.object({ product_id, variant_id }),
})

export const getProductVariantsSchema = z.object({
	params: z.object({ product_id }),
})

export type CreateProductVariantInput = z.TypeOf<
	typeof createProductVariantSchema
>
export type UpdateProductVariantInput = z.TypeOf<
	typeof updateProductVariantSchema
>
export type DeleteProductVariantInput = z.TypeOf<
	typeof deleteProductVariantSchema
>['params']
export type GetProductVariantInput = z.TypeOf<
	typeof getProductVariantSchema
>['params']
export type GetProductVariantsInput = z.TypeOf<
	typeof getProductVariantsSchema
>['params']
