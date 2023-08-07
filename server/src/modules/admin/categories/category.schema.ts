import { isObjectIdOrHexString } from 'mongoose'
import { z } from 'zod'

const payload = {
	body: z.object({
		name: z
			.string({
				required_error: 'Category name is required',
			})
			.trim(),
		slug: z
			.string({
				required_error: 'Cateogry slug is required',
			})
			.trim(),
		description: z
			.string({
				required_error: 'Category description is required',
			})
			.trim(),
		asset: z
			.string({
				required_error: 'Asset id is required',
			})
			.trim()
			.default(''),
	}),
}

const params = {
	params: z.object({
		id: z
			.string({
				required_error: 'Category id is required',
			})
			.trim()
			.refine(val => isObjectIdOrHexString(val), {
				message: 'Id is not valid',
			}),
	}),
}

export const createCategorySchema = z.object({
	...payload,
})
export const updateCategorySchema = z.object({
	...payload,
	...params,
})
export const deleteCategorySchema = z.object({
	...params,
})
export const getCategorySchema = z.object({
	...params,
})
export const getAllCategoriesSchema = z.object({
	params: z.object({
		page: z
			.string({
				required_error: 'Page is required',
			})
			.default('1'),
	}),
})

export type CreateCategoryInput = z.TypeOf<typeof createCategorySchema>['body']
export type UpdateCategoryInput = z.TypeOf<typeof updateCategorySchema>
export type DeleteCategoryInput = z.TypeOf<
	typeof deleteCategorySchema
>['params']
export type GetCategoryInput = z.TypeOf<typeof getCategorySchema>['params']
export type GetAllCategoriesInput = z.TypeOf<
	typeof getAllCategoriesSchema
>['params']
