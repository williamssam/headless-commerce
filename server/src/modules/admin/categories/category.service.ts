import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose'
import CategoryModel, {
	CategoryDocument,
	CategoryInput,
} from './category.model'

export const createCategory = (input: CategoryInput) => {
	return CategoryModel.create(input)
}

export const findCategoryById = (id: string) => {
	return CategoryModel.findById(id)
}

export const findCategory = (
	query: FilterQuery<CategoryDocument>,
	options: QueryOptions = { lean: true }
) => {
	return CategoryModel.findOne(query, {}, options)
}

export const getAllCategories = ({
	skip,
	limit,
}: {
	skip: number
	limit: number
}) => {
	return CategoryModel.find({}).limit(limit).skip(skip)
}

export const totalCategory = () => {
	return CategoryModel.estimatedDocumentCount()
}

export const findAndUpdateCategory = (
	query: FilterQuery<CategoryDocument>,
	update: UpdateQuery<CategoryDocument>,
	options: QueryOptions = { lean: true }
) => {
	return CategoryModel.findOneAndUpdate(query, update, options)
}

export const deleteCategory = (query: FilterQuery<CategoryDocument>) => {
	return CategoryModel.deleteOne(query)
}

export const findAndUpdateManyCategory = (
	query: FilterQuery<CategoryDocument>,
	update: UpdateQuery<CategoryDocument>,
	options: QueryOptions = { lean: true }
) => {
	return CategoryModel.updateMany(query, update, options)
}
