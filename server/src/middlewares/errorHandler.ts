import { NextFunction, Request, Response } from 'express'
import { HttpStatusCode } from '../@types/types'
import { CustomError, CustomErrorResponse } from '../exceptions/customError'
import log from '../utils/logger'

const errorHandler = (
	err: any,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	log.error(err)
	// if (err instanceof MongooseError) {
	// 	return res.status(503).json({
	// 		success:false,
	// 		message: err.message,
	// 	})
	// }

	if (!(err instanceof CustomError)) {
		return res.status(HttpStatusCode.INTERNAL_SERVER).json({
			message: 'Server error. Something went wrong',
			success: false,
		})
	}

	const customError = err as CustomError
	let response = {
		message: customError.message,
		success: customError.success,
	} as CustomErrorResponse

	if (customError.additionalInfo) {
		response.additionalInfo = customError.additionalInfo
	}
	return res.status(customError.status).send(response)
}

export default errorHandler
