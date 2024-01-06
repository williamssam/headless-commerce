import mongoose from 'mongoose'

export interface CustomerDocument extends mongoose.Document {
	email: string
	firstname: string
	lastname: string
	phone: string
	total_orders: number
	total_spent: number
	// address: string
	// country: string
	// state: string
	id: string
}

export type CustomerInput = Pick<
	CustomerDocument,
	'email' | 'firstname' | 'lastname' | 'total_orders' | 'total_spent'
>

const customerModel = new mongoose.Schema({
	email: { type: String, unique: true, required: true },
	firstname: { type: String, required: true },
	lastname: { type: String, required: true },
	phone: { type: String, required: true },
	total_orders: { type: Number, default: 0 },
	total_spent: { type: Number, default: 0 },
	owner_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	// address: { type: String.default: ''},
	// country: { type: String.default: ''},
	// state: { type: String.default: ''},
})

const CustomerModel = mongoose.model('Customer', customerModel)

export default CustomerModel
