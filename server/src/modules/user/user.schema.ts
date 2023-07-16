import { isObjectIdOrHexString } from 'mongoose'
import { z } from 'zod'

const payload = {
	body: z.object({
		business_name: z
			.string({ required_error: 'Business name is required' })
			.trim(),
		email: z
			.string({
				required_error: 'Email is required',
			})
			.email('Email is invalid')
			.trim(),
		password: z
			.string({
				required_error: 'Password is required',
			})
			.min(6, 'Password must be at least 6 characters')
			.regex(
				/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
				'Password must contain at least one letter, one number and one special character'
			)
			.trim(),
	}),
}
const payload_update = {
	body: z.object({
		owners_name: z
			.string({ required_error: 'Owners name is required' })
			.trim(),
		owners_email: z
			.string({ required_error: 'Owners email is required' })
			.email('Invalid email')
			.trim(),
		business: z.object({
			name: z.string({ required_error: 'Business name is required' }).trim(),
			email: z
				.string({ required_error: 'Business email is required' })
				.email('Invalid email')
				.trim()
				.optional(),
			description: z
				.string({ required_error: 'Business description is required' })
				.trim()
				.optional(),
			address: z
				.string({ required_error: 'Business address is required' })
				.trim(),
			city: z.string({ required_error: 'Business city is required' }).trim(),
			state: z
				.string({ required_error: 'Business state is required' })
				.trim(),
			postal_code: z
				.string({ required_error: 'Business posta code is required' })
				.trim()
				.optional(),
			country: z
				.string({ required_error: 'Business country is required' })
				.trim(),
		}),
		currency: z.string({ required_error: 'Currency is required' }).trim(),
	}),
}
const params = {
	params: z.object({
		id: z
			.string({
				required_error: 'User id is required',
			})
			.trim()
			.refine(val => isObjectIdOrHexString(val), {
				message: 'Id is not valid',
			}),
	}),
}

export const createUserSchema = z.object({
	...payload,
})
export const updateUserSchema = z.object({
	...payload_update,
	...params,
})
export const deleteUserSchema = z.object({
	...params,
})
// export const getUserSchema = z.object({
// 	...params,
// })
export const loginUserSchema = z.object({
	body: payload.body.pick({ email: true, password: true }),
})
export const verifyUserSchema = z.object({
	body: z.object({
		verification_code: z
			.string({ required_error: 'Verification code is required' })
			.min(4, { message: 'Verification code cannot be less than 4 digits' })
			.max(4, { message: 'Verification code cannot be more than 4 digits' }),
	}),
	...params,
})
export const forgotPasswordSchema = z.object({
	body: payload.body.pick({ email: true }),
})
export const resetPasswordSchema = z.object({
	body: payload.body.pick({ password: true }),
	params: z.object({
		id: z
			.string({
				required_error: 'User id is required',
			})
			.trim()
			.refine(val => isObjectIdOrHexString(val), {
				message: 'Id is not valid',
			}),
		password_reset_code: z.string({
			required_error: 'Password reset code is required',
		}),
	}),
})
export const changePasswordSchema = z.object({
	body: z.object({
		old_password: z.string({ required_error: 'Old password is required' }),
		new_password: z
			.string({
				required_error: 'Password is required',
			})
			.min(6, 'Password must be at least 6 characters')
			.regex(
				/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
				'Password must contain at least one letter, one number and one special character'
			)
			.trim(),
	}),
})
export const resendOTPSchema = z.object({
	...params,
})

/*  - verify if email exists, if it exists send reset link to users email
sample: https://example.com/reset-password/:user-id/:password-reset-code
misc: add token expiring after 5mins
// - send user id aswell with the reset link
 */

export type CreateUserInput = z.TypeOf<typeof createUserSchema>['body']
export type UpdateUserInput = z.TypeOf<typeof updateUserSchema>
export type DeleteUserInput = z.TypeOf<typeof deleteUserSchema>['params']
// export type GetUserInput = z.TypeOf<typeof getUserSchema>['params']
export type VerifyUserInput = z.TypeOf<typeof verifyUserSchema>
export type LoginUserInput = z.TypeOf<typeof loginUserSchema>['body']
export type ForgotPasswordInput = z.TypeOf<typeof forgotPasswordSchema>['body']
export type ResetPasswordInput = z.TypeOf<typeof resetPasswordSchema>
export type ChangePasswordInput = z.TypeOf<typeof changePasswordSchema>['body']
export type ResendOTPInput = z.TypeOf<typeof resendOTPSchema>['params']
