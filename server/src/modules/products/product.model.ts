import mongoose from 'mongoose'
import { CategoryDocument } from '../categories/category.model'
import { VariantDocument } from '../variants/variant.model'

type Inventory = {
	managed: boolean
	available: number
}

type Conditionals = {
	is_active: boolean
	is_inventory_managed: boolean
	is_out_of_stock: boolean
}

type Assets = {
	url: string
}

type Meta = {
	name: string
	value: string
}

export interface ProductDocument extends mongoose.Document {
	id: string
	active: boolean
	name: string
	slug: string
	description: string
	sku?: string
	price: number
	inventory: Inventory
	// seo: SEO
	conditionals: Conditionals
	assets: Assets[]
	categories: CategoryDocument['id'][]
	variants: VariantDocument['_id'][]
	meta: Meta[]
	// related_products: ProductDocument[]
}

export type ProductInput = Pick<
	ProductDocument,
	| 'name'
	| 'sku'
	| 'price'
	| 'price'
	| 'description'
	| 'slug'
	| 'inventory'
	| 'categories'
	| 'active'
	| 'variants'
	| 'meta'
>
// export type ProductInputs = {
// 	name: string

// }

const productModel = new mongoose.Schema(
	{
		active: { type: Boolean, default: true },
		name: { type: String, required: true },
		slug: {
			type: String,
			unique: true,
			required: true,
		},
		description: { type: String, default: '' },
		sku: { type: String, default: '' },
		price: { type: Number, required: true },
		inventory: {
			managed: { type: Boolean, required: true },
			available: { type: Number, required: true },
		},
		conditionals: {
			is_active: { type: Boolean, default: true },
			is_inventory_managed: { type: Boolean, default: false },
			is_out_of_stock: { type: Boolean, default: false },
		},
		categories: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Category',
				required: [true, 'Product must belong to a category'],
			},
		],
		// related_products: [
		// 	{
		// 		type: mongoose.Schema.Types.ObjectId,
		// 		ref: 'product',
		// 	},
		// ],
		assets: [
			{
				url: String,
			},
		],
		variants: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Variant',
			},
		],
		meta: [
			{
				name: String,
				value: String,
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

const ProductModel = mongoose.model<ProductDocument>('Product', productModel)

export default ProductModel
