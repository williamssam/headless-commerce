import type { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose'
import OrderModel, { OrderDocument, OrderInput } from './order.model'

type FindAllOrders = {
	skip: number
	limit: number
	filter_by?: Partial<{
		status: 'pending' | 'shipped' | 'cancelled'
		payment_status: 'paid' | 'not_paid' | 'refunded'
		fulfillment_status: 'fulfilled' | 'not_fulfilled' | 'returned'
		customer_email: string
		customer_name: string
		date: string
	}>
}

export const findAllOrders = ({ skip, limit, filter_by }: FindAllOrders) => {
	return OrderModel.find({
		// TODO:  filter by "status", "payment status", "fulfillment status", "date", "customer email", "customer name" etc.
		status: {
			$in: filter_by?.status,
		},
		payment_status: {
			$in: filter_by?.payment_status,
		},
		fulfillment_status: {
			$in: filter_by?.fulfillment_status,
		},
		customer_email: filter_by?.customer_email,
		customer_name: filter_by?.customer_name,
		created_at: filter_by?.date,
	})
		.skip(skip)
		.limit(limit)
}

export const createOrder = (order: OrderInput) => {
	return OrderModel.create(order)
}

export const findAndUpdateOrder = (
	query: FilterQuery<OrderDocument>,
	update: UpdateQuery<OrderDocument>,
	options: QueryOptions = { lean: true }
) => {
	return OrderModel.findOneAndUpdate(query, update, options)
}

export const deleteOrder = (query: FilterQuery<OrderDocument>) => {
	return OrderModel.deleteOne(query)
}

export const getTotalOrder = () => {
	return OrderModel.estimatedDocumentCount()
}

export const findOrder = (
	query: FilterQuery<OrderDocument>,
	options: QueryOptions = { lean: true }
) => {
	return OrderModel.findOne(query, {}, options)
}

export const findOrderById = (id: string) => {
	return OrderModel.findById(id)
}
