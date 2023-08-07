import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose'
import VariantModel, { VariantDocument, VariantInput } from './variant.model'

export const createVariant = (input: VariantInput) => {
	return VariantModel.create(input)
}

export const findVariantById = (id: string) => {
	return VariantModel.findById(id)
}

export const findVariant = (
	query: FilterQuery<VariantDocument>,
	options: QueryOptions = { lean: true }
) => {
	return VariantModel.findOne(query, {}, options)
}

export const findProductVariants = (id: string) => {
	return VariantModel.find({ _id: id })
}

export const findAndUpdateVariant = (
	query: FilterQuery<VariantDocument>,
	update: UpdateQuery<VariantDocument>,
	options: QueryOptions = { lean: true }
) => {
	return VariantModel.findOneAndUpdate(query, update, options)
}

export const deleteVariant = (query: FilterQuery<VariantDocument>) => {
	return VariantModel.deleteOne(query)
}

export const deleteManyVariants = (query: FilterQuery<VariantDocument>) => {
	return VariantModel.deleteMany(query)
}
