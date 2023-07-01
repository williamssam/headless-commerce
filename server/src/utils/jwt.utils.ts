import jwt from 'jsonwebtoken'
import { HttpStatusCode } from '../@types/types'
import { config } from '../config'
import { ApiError } from '../exceptions/apiError'

export const signJWT = (payload: Object) => {
	try {
		const key = Buffer.from(config.jwt.privateKey, 'base64').toString('ascii')
		return jwt.sign(payload, key, {
			algorithm: 'RS256',
			expiresIn: config.jwt.expiresIn,
		})
	} catch (error) {
		console.error('jwt error', error)
		return null
	}
}

export const verifyJWT = (token: string) => {
	try {
		const key = Buffer.from(config.jwt.privateKey, 'base64').toString('ascii')
		const decoded = jwt.verify(token, key)
		return {
			expired: false,
			decoded,
		}
	} catch (error) {
		throw new ApiError(
			'Token expired or invalid, pls login again',
			false,
			HttpStatusCode.UNAUTHORIZED
		)
	}
}
