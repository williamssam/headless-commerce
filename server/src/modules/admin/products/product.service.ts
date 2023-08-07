import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose'
import ProductModel, { ProductDocument, ProductInput } from './product.model'

export const createProduct = async (input: ProductInput) => {
	return await (
		await ProductModel.create(input)
	).populate('categories', 'id name slug')
}

export const findProduct = (
	query: FilterQuery<ProductDocument>,
	options: QueryOptions = { lean: true }
) => {
	return ProductModel.findOne(query, {}, options)
}

export const findProductById = (id: string) => {
	return ProductModel.findById(id)
}

export const findAllProducts = ({
	skip,
	limit,
}: {
	skip: number
	limit: number
}) => {
	return ProductModel.find({})
		.limit(limit)
		.skip(skip)
		.populate('categories', 'id name slug')
		.populate('variants', 'id name options')
}

export const findAndUpdateProduct = (
	query: FilterQuery<ProductDocument>,
	update: UpdateQuery<ProductDocument>,
	options: QueryOptions = { lean: true }
) => {
	return ProductModel.findOneAndUpdate(query, update, options)
}

export const deleteProduct = (query: FilterQuery<ProductDocument>) => {
	return ProductModel.deleteOne(query)
}

export const getTotalProducts = () => {
	return ProductModel.estimatedDocumentCount()
}
