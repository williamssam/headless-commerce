import { NextFunction, Request, Response } from 'express'
import { HttpStatusCode } from '../@types/types'
import { ApiError } from '../exceptions/apiError'
import { verifyJWT } from '../utils/jwt.utils'

export const deserializeUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const access_token =
			req.cookies['hc-user'] || req.headers.authorization?.split(' ')[1]
		if (!access_token) {
			return next()
		}

		const { decoded, expired } = verifyJWT(access_token)
		if (decoded) {
			res.locals.user = decoded
			return next()
		}

		// TODO: Instead of throwing error, refresh token
		if (expired) {
			throw new ApiError(
				'Please login again.',
				false,
				HttpStatusCode.UNAUTHORIZED
			)
		}
		return next()
	} catch (error) {
		return next(error)
	}
}
