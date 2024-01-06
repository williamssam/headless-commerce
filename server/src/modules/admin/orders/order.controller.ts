import type { NextFunction, Request, Response } from 'express'
import { HttpStatusCode } from '../../../@types/types'
import type { GetAllOrdersInput } from './order.schema'
import { findAllOrders, getTotalOrder } from './order.service'

export const getAllOrdersHandler = async (
	req: Request<GetAllOrdersInput>,
	res: Response,
	next: NextFunction
) => {
	try {
		// TODO: should be able to filter by "status", "payment status", "fulfillment status", "date", "customer email", "customer name" etc.
		const {
			customer_email,
			customer_name,
			date,
			status,
			payment_status,
			fulfillment_status,
		} = req.params
		const page = parseInt(req.params.page as string) || 1

		/* /orders?page=1&status=pending&payment_status=paid&fulfillment_status=fulfilled&date=2022-01-01&customer_email=UqUeh@example.com&customer_name=John */

		const limit = 15
		const skip = (page - 1) * limit
		const orders = await findAllOrders({
			skip,
			limit,
			filter_by: {
				customer_email,
				customer_name,
				date,
				status,
				payment_status,
				fulfillment_status,
			},
		})
		const total = await getTotalOrder()

		return res.status(HttpStatusCode.OK).json({
			success: true,
			message: 'Orders retrieved successfully',
			data: orders,
			meta: {
				total,
				current_page: page,
				per_page: limit,
				total_pages: Math.ceil(total / limit),
				count: orders.length,
			},
		})
	} catch (error) {
		return next(error)
	}
}
