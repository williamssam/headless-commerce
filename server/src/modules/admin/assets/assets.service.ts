import type { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose'
import AssetModel, { AssetDocument, type AssetInput } from './assets.models'

export const createAssets = (input: AssetInput[]) => {
	return AssetModel.insertMany(input)
}

export const deleteAsset = (id: string) => {
	return AssetModel.findByIdAndDelete(id)
}

export const findAsset = (
	query: FilterQuery<AssetDocument>,
	options?: QueryOptions
) => {
	return AssetModel.findOne(query, {}, options)
}

export const getAllAssets = ({
	skip,
	limit,
}: {
	skip: number
	limit: number
}) => {
	return AssetModel.find({}).limit(limit).skip(skip)
}

export const totalAssets = () => {
	return AssetModel.estimatedDocumentCount()
}

export const findAndUpdateAsset = (
	query: FilterQuery<AssetDocument>,
	update: UpdateQuery<AssetDocument>,
	options: QueryOptions = { lean: true }
) => {
	return AssetModel.findOneAndUpdate(query, update, options)
}
