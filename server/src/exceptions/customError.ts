import { HttpStatusCode } from '../@types/types'

// Note: Our custom error extends from Error, so we can throw this error as an exception.
export class CustomError extends Error {
	message!: string
	success!: boolean
	additionalInfo!: any
	status!: number

	constructor(
		message: string,
		success: boolean = false,
		status: number = HttpStatusCode.INTERNAL_SERVER,
		additionalInfo: any = undefined
	) {
		super(message)
		this.message = message
		this.success = success
		this.additionalInfo = additionalInfo
		this.status = status
	}
}

export type CustomErrorResponse = {
	message: string
	additionalInfo?: string
	success: boolean
	status: boolean
}
