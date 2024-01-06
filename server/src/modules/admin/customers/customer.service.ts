import type { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose'
import CustomerModel, {
	CustomerDocument,
	type CustomerInput,
} from './customer.model'

export const findAllCustomers = ({
	skip,
	limit,
}: {
	skip: number
	limit: number
}) => {
	return CustomerModel.find({}).skip(skip).limit(limit)
}

export const createCustomer = (
	customer: CustomerInput & { owner_id: string }
) => {
	return CustomerModel.create(customer)
}

export const findAndUpdateCustomer = (
	query: FilterQuery<CustomerDocument>,
	update: UpdateQuery<CustomerDocument>,
	options: QueryOptions = { lean: true }
) => {
	return CustomerModel.findOneAndUpdate(query, update, options)
}

export const deleteCustomer = (query: FilterQuery<CustomerDocument>) => {
	return CustomerModel.deleteOne(query)
}

export const getTotalCustomer = () => {
	return CustomerModel.estimatedDocumentCount()
}

export const findCustomer = (
	query: FilterQuery<CustomerDocument>,
	options: QueryOptions = { lean: true }
) => {
	return CustomerModel.findOne(query, {}, options)
}

export const findCustomerById = (id: string) => {
	return CustomerModel.findById(id)
}
