import { CustomError } from './customError'

export class ApiError extends CustomError {
	constructor(message: string, success: boolean = false, status: number) {
		super(message, success, status)
	}
}
