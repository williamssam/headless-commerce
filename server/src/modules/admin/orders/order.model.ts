import mongoose from 'mongoose'
import { nanoid } from 'nanoid'
import type { ProductDocument } from '../products/product.model'

type Meta = {
	name: string
	value: string
}

export interface OrderDocument extends mongoose.Document {
	customer: {
		firstname: string
		lastname: string
		email: string
		phone: string
	}
	status: 'pending' | 'shipped' | 'cancelled'
	payment_status: 'paid' | 'not-paid' | 'refunded'
	fulfillment_status: 'fulfilled' | 'not-fulfilled' | 'returned'
	order_total_value: number
	payment_info: {
		trans_ref: string
		paid_on: Date
		paid_amount: number
		paid_with: 'card' | 'transfer'
		payment_gateway: string
	}
	shipping: {
		address: string
		country: string
		state: string
		nearest_landmark: string
	}
	shipped_on: Date
	delivered_on: Date
	carrier: {
		name: string
		phone: string
	}
	line_items: [
		{
			product_id: ProductDocument['id']
			quantity: number
		}
	]
	delivery_instruction: string
	meta: Meta[]
	created_at: Date
	updated_at: Date
}

export type OrderInput = Omit<OrderDocument, 'id' | 'created_at' | 'updated_at'>

const orderModel = new mongoose.Schema({
	customer: {
		firstname: { type: String, required: true },
		lastname: { type: String, required: true },
		email: { type: String, required: true },
		phone: { type: String, required: true },
		// The order's customer reference, must be unique. If left blank, one will be automatically generated.
		customer_ref: {
			type: String,
			default: () => `cus_${nanoid(6)}`,
			unique: true,
		},
	},
	status: {
		type: String,
		enum: ['pending', 'shipped', 'cancelled'],
		required: true,
		default: 'pending',
	},
	// Indicates the payment status of the order.
	payment_status: {
		type: String,
		enum: ['paid', 'not-paid', 'refunded'],
		required: true,
	},
	// the total price of the order
	order_total_value: { type: Number, required: true },
	// Indicates the fulfillment status of the order
	fulfillment_status: {
		type: String,
		enum: ['fulfilled', 'not-fulfilled', 'returned'],
		required: true,
		default: 'not-fulfilled',
	},
	payment_info: {
		trans_ref: { type: String, required: true },
		paid_on: { type: Date, required: true },
		paid_amount: { type: Number, required: true },
		paid_with: { type: String, required: true, enum: ['card', 'transfer'] },
		payment_gateway: { type: String, default: '' },
	},
	shipping: {
		address: { type: String, required: true },
		country: { type: String, required: true },
		state: { type: String, required: true },
		nearest_landmark: { type: String, required: true },
	},
	shipped_on: { type: Date, default: '' },
	delivered_on: { type: Date, default: '' },
	carrier: {
		name: { type: String, default: '' },
		phone: { type: String, default: '' },
	},
	line_items: [
		{
			product_id: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Product',
			},
			quantity: { type: Number, required: true },
		},
	],
	delivery_instruction: { type: String, default: '' },
	meta: [
		{
			name: String,
			value: String,
		},
	],
})

const OrderModel = mongoose.model<OrderDocument>('Order', orderModel)

export default OrderModel
