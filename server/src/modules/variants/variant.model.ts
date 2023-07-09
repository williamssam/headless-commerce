import mongoose from 'mongoose'

type Option = {
	id: string
	name: string
	price?: number
	quantity?: number
	sku?: string
	image_url?: string
}

export interface VariantDocument extends mongoose.Document {
	id: string
	name: string
	options: Option[]
	createdAt: Date
	updatedAt: Date
}

export type VariantInput = {
	name: string
	options: Omit<Option, 'id'>[]
}

const variantModel = new mongoose.Schema(
	{
		name: { type: String, required: true },
		options: [
			{
				type: new mongoose.Schema(
					{
						name: String,
						price: { type: Number, default: 0 },
						quantity: { type: Number, default: 0 },
						sku: { type: String, default: '' },
						image_url: String,
					},
					{
						timestamps: {
							createdAt: 'created_at',
							updatedAt: 'updated_at',
						},
					}
				),
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

const VariantModel = mongoose.model<VariantDocument>('Variant', variantModel)

export default VariantModel
