import mongoose from 'mongoose'
import { customAlphabet } from 'nanoid'

const code = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10)

export interface DiscountDocument extends mongoose.Document {
	id: string
	code: string
	type: 'fixed' | 'percentage'
	value: number
	expires_on: string
	starts_on: string
	is_expired: boolean
	limit_quantity: boolean
	quantity: number
}

export type DiscountInput = Pick<
	DiscountDocument,
	'code' | 'type' | 'value' | 'expires_on' | 'starts_on' | 'quantity'
>

const discountModel = new mongoose.Schema(
	{
		code: {
			type: String,
			unique: true,
			required: true,
			default: () => code(10),
		},
		type: { type: String, enum: ['fixed', 'percentage'] },
		value: { type: Number, required: true, default: 0 },
		expires_on: { type: Date, required: true },
		starts_on: { type: Date, required: true },
		is_expired: { type: Boolean, required: true, default: false },
		limit_quantity: { type: Boolean, required: true, default: false },
		quantity: { type: Number, required: true, default: 0 },
		// products_ids: [
		// 	{
		// 		type: mongoose.Schema.Types.ObjectId,
		// 	},
		// ],
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
	}
)

const DiscountModel = mongoose.model<DiscountDocument>(
	'Discount',
	discountModel
)

export default DiscountModel
