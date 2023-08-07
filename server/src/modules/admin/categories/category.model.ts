import mongoose from 'mongoose'
import { AssetDocument } from '../assets/assets.models'

export interface CategoryDocument extends mongoose.Document {
	id: string
	name: string
	slug: string
	description: string
	products: number
	asset: AssetDocument['_id']
	created_at: Date
	updated_at: Date
}

export type CategoryInput = Pick<
	CategoryDocument,
	'slug' | 'name' | 'description' | 'asset'
>

const catgoryModel = new mongoose.Schema(
	{
		name: { type: String, required: true },
		slug: {
			type: String,
			unique: true,
			required: true,
		},
		description: { type: String, required: true },
		products: { type: Number, required: true, default: 0 },
		asset: { type: mongoose.Schema.Types.ObjectId, ref: 'Asset' },
		subcategory: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'category',
			},
		],
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
	}
)

const CategoryModel = mongoose.model<CategoryDocument>('Category', catgoryModel)

export default CategoryModel
