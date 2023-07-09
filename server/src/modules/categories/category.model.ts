import mongoose from 'mongoose'

export interface CategoryDocument extends mongoose.Document {
	id: string
	name: string
	slug: string
	description: string
	products: number
	image_url: string
	created_at: Date
	updated_at: Date
}

export type CategoryInput = Pick<
	CategoryDocument,
	'slug' | 'name' | 'description' | 'image_url'
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
		image_url: { type: String, default: '' },
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
