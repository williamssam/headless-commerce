import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose'
import UserModel, { UserDocument, UserInput } from './user.models'

export const createUser = (input: UserInput) => {
	return UserModel.create(input)
}

export const findUserById = (id: string) => {
	return UserModel.findById(id)
}

export const findUser = (
	query: FilterQuery<UserDocument>,
	options?: QueryOptions
) => {
	return UserModel.findOne(query, {}, options)
}

export const findAndUpdateUser = (
	query: FilterQuery<UserDocument>,
	update: UpdateQuery<UserDocument>,
	options: QueryOptions = { lean: true }
) => {
	return UserModel.findOneAndUpdate(query, update, options)
}

export const deleteUser = (query: FilterQuery<UserDocument>) => {
	return UserModel.deleteOne(query)
}
