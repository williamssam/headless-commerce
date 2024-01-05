import argon2 from 'argon2'
import { NextFunction, Request, Response } from 'express'
import { customAlphabet, nanoid } from 'nanoid'
import { HttpStatusCode } from '../../../@types/types'
import { ApiError } from '../../../exceptions/apiError'
import { forgetPasswordMail } from '../../../templates/forgetPasswordMail'
import { verifyEmailMail } from '../../../templates/verifyEmailMail'
import { welcomeEmail } from '../../../templates/welcomeMail'
import { signJWT } from '../../../utils/jwt.utils'
import { sendMail } from '../../../utils/mailer'
import {
	ChangePasswordInput,
	CreateUserInput,
	DeleteUserInput,
	ForgotPasswordInput,
	LoginUserInput,
	ResendOTPInput,
	ResetPasswordInput,
	UpdateUserInput,
	VerifyUserInput,
} from './user.schema'
import {
	createUser,
	deleteUser,
	findAndUpdateUser,
	findUser,
	findUserById,
} from './user.service'

const customNano = customAlphabet('0123456789', 4)

export const createUserHandler = async (
	req: Request<{}, {}, CreateUserInput>,
	res: Response,
	next: NextFunction
) => {
	try {
		const { email, business_name } = req.body

		const userExists = await findUser({ 'business.email': email })
		if (userExists) {
			throw new ApiError(
				'User already exist, login to continue',
				false,
				HttpStatusCode.BAD_REQUEST
			)
		}

		const businessNameExists = await findUser({
			'business.name': business_name,
		})
		if (businessNameExists) {
			throw new ApiError(
				'User with business name already exists',
				false,
				HttpStatusCode.BAD_REQUEST
			)
		}

		const user = await createUser(req.body)
		user.business.email = email
		user.business.name = business_name
		user.verification_code = customNano()

		await sendMail({
			to: user.business.email,
			from: 'Headless Commerce <admin@headlesscommerce.com>',
			subject: 'Verify your email address',
			html: verifyEmailMail({ otp: user.verification_code }),
		})

		await user.save()
		return res.status(HttpStatusCode.CREATED).json({
			success: true,
			message: 'User created successfully!',
			data: user,
		})
	} catch (error) {
		return next(error)
	}
}

export const resendOtpHandler = async (
	req: Request<ResendOTPInput>,
	res: Response,
	next: NextFunction
) => {
	try {
		const { id } = req.params

		const user = await findUserById(id)
		if (!user) {
			throw new ApiError('User not found', false, HttpStatusCode.BAD_REQUEST)
		}

		user.verification_code = customNano()
		await sendMail({
			to: user.business.email,
			from: 'Headless Commerce <admin@headlesscommerce.com>',
			subject: 'Re: Verify your email address',
			html: verifyEmailMail({ otp: user.verification_code }),
		})

		await user.save()

		// TODO: Send otp to user email address

		return res.status(HttpStatusCode.OK).json({
			success: true,
			message: 'OTP resent successfully!',
			data: null,
		})
	} catch (error) {
		return next(error)
	}
}

export const verifyUserHandler = async (
	req: Request<VerifyUserInput['params'], {}, VerifyUserInput['body']>,
	res: Response,
	next: NextFunction
) => {
	try {
		const { id } = req.params
		const { verification_code } = req.body

		const user = await findUserById(id)
		if (!user) {
			throw new ApiError('User not found', false, HttpStatusCode.BAD_REQUEST)
		}

		if (user.verified) {
			throw new ApiError(
				'User already verified',
				false,
				HttpStatusCode.BAD_REQUEST
			)
		}

		if (user.verification_code !== verification_code) {
			throw new ApiError(
				'Verification code is incorrect',
				false,
				HttpStatusCode.BAD_REQUEST
			)
		}

		user.verified = true
		user.verification_code = ''

		await sendMail({
			to: user.business.email,
			from: 'Headless Commerce <admin@headlesscommerce.com>',
			subject: 'Welcome to Headless Commerce',
			html: welcomeEmail({ name: user.business.name }),
		})

		await user.save()

		return res.status(HttpStatusCode.OK).json({
			success: true,
			message: 'User successfully verified!!',
			data: null,
		})
	} catch (error) {
		return next(error)
	}
}

export const loginUserHandler = async (
	req: Request<{}, {}, LoginUserInput>,
	res: Response,
	next: NextFunction
) => {
	const message = 'Invalid email or password'

	try {
		const { email, password } = req.body

		const user = await findUser({ 'business.email': email })
		if (!user) {
			throw new ApiError(message, false, HttpStatusCode.BAD_REQUEST)
		}

		// FIXME: don't forget to redirect user to their login details with their email address if registered in the url
		if (!user.verified) {
			throw new ApiError(
				'Email address is not verified',
				false,
				HttpStatusCode.BAD_REQUEST
			)
		}

		const isPasswordValid = await user.comparePassword(password)
		if (!isPasswordValid) {
			throw new ApiError(message, false, HttpStatusCode.BAD_REQUEST)
		}

		const access_token = signJWT({ ...user, id: user._id })
		res.cookie('hc-user', access_token, {
			maxAge: 8.64e8, // 15mins
			httpOnly: true,
			sameSite: 'strict',
			secure: process.env.NODE_ENV === 'production' ? true : false,
		})

		return res.status(200).json({
			success: true,
			message: 'Login successful!',
			data: {
				user,
				access_token,
			},
		})
	} catch (error) {
		return next(error)
	}
}

export const forgetPasswordHandler = async (
	req: Request<{}, {}, ForgotPasswordInput>,
	res: Response,
	next: NextFunction
) => {
	try {
		const { email } = req.body

		const user = await findUser({ 'business.email': email })
		if (!user) {
			throw new ApiError(
				'User not found!',
				false,
				HttpStatusCode.BAD_REQUEST
			)
		}

		if (!user.verified) {
			throw new ApiError(
				'Email address is not verified',
				false,
				HttpStatusCode.BAD_REQUEST
			)
		}

		// TODO: send email to user with token and id
		const token = nanoid()
		const hash = await argon2.hash(token)
		user.password_reset_code = hash

		console.log('token', token)
		await sendMail({
			to: user.business.email,
			from: 'Headless Commerce <admin@headlesscommerce.com>',
			subject: 'Reset your password',
			html: forgetPasswordMail({
				id: user._id,
				token,
				name: user.business.name,
			}),
		})
		await user.save()

		return res.status(HttpStatusCode.OK).json({
			success: true,
			message: 'Password reset code sent successfully',
			data: null,
		})
	} catch (error) {
		return next(error)
	}
}

export const resetPasswordHandler = async (
	req: Request<ResetPasswordInput['params'], {}, ResetPasswordInput['body']>,
	res: Response,
	next: NextFunction
) => {
	try {
		const { id } = req.params
		const { password, password_reset_code } = req.body
		const user = await findUserById(id)
		if (!user) {
			throw new ApiError('User not found', false, HttpStatusCode.BAD_REQUEST)
		}

		const isPasswordResetCodeValid = await argon2.verify(
			user.password_reset_code as string,
			password_reset_code
		)
		if (!isPasswordResetCodeValid) {
			throw new ApiError(
				'Invalid or expired password reset code',
				false,
				HttpStatusCode.BAD_REQUEST
			)
		}

		user.password = password
		user.password_reset_code = ''
		await user.save()

		return res.status(HttpStatusCode.OK).json({
			success: true,
			message: 'Password reset successful',
		})
	} catch (error) {
		return next(error)
	}
}

export const changePasswordHandler = async (
	req: Request<{}, {}, ChangePasswordInput>,
	res: Response,
	next: NextFunction
) => {
	try {
		const { new_password, old_password } = req.body

		const userId = res.locals.user.id
		const user = await findUserById(userId)
		if (!user) {
			throw new ApiError('User not found', false, HttpStatusCode.BAD_REQUEST)
		}

		const isPasswordValid = await user.comparePassword(old_password)
		if (!isPasswordValid) {
			throw new ApiError(
				'Old password is incorrect',
				false,
				HttpStatusCode.BAD_REQUEST
			)
		}

		user.password = new_password
		await user.save()

		return res.status(200).json({
			success: true,
			message: 'Password changed successfully',
			data: null,
		})
	} catch (error) {
		return next(error)
	}
}

export const getCurrentUserHandler = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		// NOTE: I cant return just the locals because it contains all the details of the user document including the ones the user should not have access to
		const user = await findUserById(res.locals.user._doc._id)

		return res.status(200).json({
			success: true,
			message: 'Current user retrieved successfully',
			data: user,
		})
	} catch (error) {
		return next(error)
	}
}

export const updateUserHandler = async (
	req: Request<UpdateUserInput['params'], {}, UpdateUserInput['body']>,
	res: Response,
	next: NextFunction
) => {
	try {
		const { id } = req.params

		const userExists = await findUserById(id)
		if (!userExists) {
			throw new ApiError('User not found', false, HttpStatusCode.BAD_REQUEST)
		}

		const user = await findAndUpdateUser(
			{ _id: id },
			{ ...req.body },
			{ new: true }
		)
		return res.status(HttpStatusCode.OK).json({
			success: true,
			message: 'User updated successfully',
			data: user,
		})
	} catch (error) {
		return next(error)
	}
}

export const deleteUserHandler = async (
	req: Request<DeleteUserInput>,
	res: Response,
	next: NextFunction
) => {
	try {
		const { id } = req.params

		const userExists = await findUserById(id)
		if (!userExists) {
			throw new ApiError('User not found', false, HttpStatusCode.BAD_REQUEST)
		}

		await deleteUser({ _id: id })
		res.clearCookie('hc-user')
		return res.status(HttpStatusCode.OK).json({
			success: true,
			message: 'User deleted successfully!',
		})
	} catch (error) {
		return next(error)
	}
}
