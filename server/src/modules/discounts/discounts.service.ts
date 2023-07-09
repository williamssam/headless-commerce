import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose'
import DiscountModel, {
	DiscountDocument,
	DiscountInput,
} from './discounts.model'

export const createDiscount = (input: DiscountInput) => {
	return DiscountModel.create(input)
}

export const findDiscount = (
	query: FilterQuery<DiscountDocument>,
	options: QueryOptions = { lean: true }
) => {
	return DiscountModel.findOne(query, {}, options)
}

export const getAllDiscounts = ({
	skip,
	limit,
}: {
	skip: number
	limit: number
}) => {
	return DiscountModel.find({}).limit(limit).skip(skip)
}

export const getTotalDiscount = () => {
	return DiscountModel.estimatedDocumentCount()
}

export const findAndUpdateDiscount = (
	query: FilterQuery<DiscountDocument>,
	update: UpdateQuery<DiscountDocument>,
	options: QueryOptions = { lean: true }
) => {
	return DiscountModel.findOneAndUpdate(query, update, options)
}

export const deleteDiscount = (query: FilterQuery<DiscountDocument>) => {
	return DiscountModel.deleteOne(query)
}
