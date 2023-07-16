import { NextFunction, Request, Response } from 'express'
import { HttpStatusCode } from '../@types/types'
import { ApiError } from '../exceptions/apiError'

export const requireUser = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const user = res.locals.user
	if (!user) {
		throw new ApiError(
			'No active session, please login',
			false,
			HttpStatusCode.FORBIDDEN_ERROR
		)
	}

	return next()
}
