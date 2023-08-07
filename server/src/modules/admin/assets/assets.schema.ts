import { isObjectIdOrHexString } from 'mongoose'
import { z } from 'zod'

const allowedExtension = ['image/jpeg', 'image/jpg', 'image/png']

// const payload = {
// 	body: z.object({
// 		images: z
// 			.instanceof(FileList, {
// 				message: 'Please select an image file not more than 1mb',
// 			})
// 			.superRefine((val, ctx) => {
// 				if (val.length === 0) {
// 					ctx.addIssue({
// 						code: z.ZodIssueCode.custom,
// 						message: 'Please select an image file not more than 1mb',
// 					})
// 				}
// 				if (val[0]?.size > 1000000) {
// 					ctx.addIssue({
// 						code: z.ZodIssueCode.custom,
// 						message: `Image cannot be larger than 1mb`,
// 					})
// 				}
// 				if (!val[0]?.type.includes('image')) {
// 					ctx.addIssue({
// 						code: z.ZodIssueCode.custom,
// 						message: `You can only upload image.`,
// 					})
// 				}
// 				if (!allowedExtension.includes(val[0]?.type)) {
// 					ctx.addIssue({
// 						code: z.ZodIssueCode.custom,
// 						message: `Only jpg, jpeg and png are allowed`,
// 					})
// 				}
// 			}),
// 	}),
// }
const params = {
	params: z.object({
		id: z
			.string({
				required_error: 'Asset id is required',
			})
			.trim()
			.refine(val => isObjectIdOrHexString(val), {
				message: 'Id is not valid',
			}),
	}),
}

// export const createAssetSchema = z.object({
// 	...payload,
// })
export const deleteAssetSchema = z.object({
	...params,
})

export type DeleteAssetInput = z.TypeOf<typeof deleteAssetSchema>['params']
// export type CreateAssetInput = z.TypeOf<typeof createAssetSchema>['body']
