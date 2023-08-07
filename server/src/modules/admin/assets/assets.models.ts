import mongoose from 'mongoose'

export interface AssetDocument extends mongoose.Document {
	id: string
	public_id: string
	url: string
	resource_type: 'image' | 'video' | 'raw' | 'auto'
	parent_id: string
	createdAt: Date
	updatedAt: Date
}

export type AssetInput = Pick<
	AssetDocument,
	'url' | 'public_id' | 'resource_type'
>

const assetModel = new mongoose.Schema(
	{
		public_id: String,
		url: { type: String, required: true },
		resource_type: { type: String, required: true },
		parent_id: {
			type: mongoose.Schema.Types.ObjectId,
			// required: true,
		},
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
	}
)

const AssetModel = mongoose.model<AssetDocument>('Asset', assetModel)

export default AssetModel
