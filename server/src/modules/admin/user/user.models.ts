import argon2 from 'argon2'
import mongoose from 'mongoose'
import { customAlphabet } from 'nanoid'

type Business = {
	name: string
	email: string
	description?: string
	address: string
	city: string
	state: string
	postal_code?: string
	country: string
}

export interface UserDocument extends mongoose.Document {
	id: string
	owners_name: string
	owners_email: string
	business: Business
	currency: string
	password: string
	password_reset_code?: string
	verified: boolean
	verification_code: string
	access_token: string
	created_at: Date
	updated_at: Date
	comparePassword: (password: string) => Promise<boolean>
}

export type UserInput = {
	business_name: string
	email: string
	password: string
}

const nanoid = customAlphabet('0123456789', 5)

const userModel = new mongoose.Schema(
	{
		owners_name: {
			type: String,
			default: '',
		},
		owners_email: {
			type: String,
			unique: true,
			default: '',
		},
		business: {
			id: {
				type: String,
				required: true,
				unique: true,
				default: () => nanoid(),
			},
			name: {
				type: String,
				default: '',
			},
			email: {
				type: String,
				unique: true,
				default: '',
			},
			description: String,
			address: {
				type: String,
				default: '',
			},
			city: {
				type: String,
			},
			state: {
				type: String,
				default: '',
			},
			postal_code: String,
			country: {
				type: String,
				default: '',
			},
		},
		currency: {
			type: String,
			default: '',
		},
		verified: {
			type: Boolean,
			default: false,
		},
		verification_code: String,
		password: {
			type: String,
			required: true,
		},
		password_reset_code: String,
		access_token: String,
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
		toJSON: {
			transform(doc, ret) {
				delete ret.password
				delete ret.verification_code
				delete ret.__v
				delete ret._id
			},
		},
	}
)

userModel.pre('save', async function (next) {
	const user = this
	if (!user.isModified('password')) {
		return next()
	}

	const hash = await argon2.hash(user.password)
	user.password = hash
	return next()
})

userModel.methods.comparePassword = async function (password: string) {
	const user = this as UserDocument
	try {
		return await argon2.verify(user.password, password)
	} catch {
		return false
	}
}

const UserModel = mongoose.model<UserDocument>('User', userModel)

export default UserModel
