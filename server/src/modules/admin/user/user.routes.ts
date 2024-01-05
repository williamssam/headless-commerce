import { Router } from 'express'
import { config } from '../../../config'
import { deserializeUser } from '../../../middlewares/deserializeUser'
import { requireUser } from '../../../middlewares/requireUser'
import { validateResource } from '../../../middlewares/validateResource'
import {
	changePasswordHandler,
	createUserHandler,
	deleteUserHandler,
	forgetPasswordHandler,
	getCurrentUserHandler,
	loginUserHandler,
	resendOtpHandler,
	resetPasswordHandler,
	updateUserHandler,
	verifyUserHandler,
} from './user.controller'
import {
	changePasswordSchema,
	createUserSchema,
	deleteUserSchema,
	forgotPasswordSchema,
	loginUserSchema,
	resendOTPSchema,
	resetPasswordSchema,
	updateUserSchema,
	verifyUserSchema,
} from './user.schema'

export default (router: Router) => {
	/**
	 * @description Register user endpoint
	 */
	router.post(
		`${config.routePrefix}/register`,
		validateResource(createUserSchema),
		createUserHandler
	)

	/**
	 * @description Resend OTP endpoint
	 */
	router.get(
		`${config.routePrefix}/resend-otp/:id`,
		validateResource(resendOTPSchema),
		resendOtpHandler
	)

	/**
	 * @description Verify user email endpoint
	 */
	// NOTE: maybe delete this
	router.post(
		`${config.routePrefix}/verify/:id`,
		validateResource(verifyUserSchema),
		verifyUserHandler
	)

	/**
	 * @description Login user endpoint, using email and password
	 */
	router.post(
		`${config.routePrefix}/login`,
		validateResource(loginUserSchema),
		loginUserHandler
	)

	/**
	 * @description Forget password endpoint
	 */
	router.post(
		`${config.routePrefix}/forget-password/:id`,
		validateResource(forgotPasswordSchema),
		forgetPasswordHandler
	)

	/**
	 * @description Reset password endpoint
	 */
	router.patch(
		`${config.routePrefix}/reset-password/:id/:password_reset_code`,
		validateResource(resetPasswordSchema),
		resetPasswordHandler
	)

	/**
	 * @description Change password endpoint if user is logged in
	 */
	router.patch(
		`${config.routePrefix}/change-password`,
		[deserializeUser, requireUser, validateResource(changePasswordSchema)],
		changePasswordHandler
	)

	/**
	 * @description Get current logged in user endpoint
	 */
	router.get(
		`${config.routePrefix}/user`,
		[deserializeUser, requireUser],
		getCurrentUserHandler
	)

	/**
	 * @description Update user endpoint
	 */
	router.put(
		`${config.routePrefix}/user/:id`,
		[deserializeUser, requireUser, validateResource(updateUserSchema)],
		updateUserHandler
	)

	/**
	 * @description Delete user endpoint
	 */
	router.delete(
		`${config.routePrefix}/user/:id`,
		[deserializeUser, requireUser, validateResource(deleteUserSchema)],
		deleteUserHandler
	)
}
