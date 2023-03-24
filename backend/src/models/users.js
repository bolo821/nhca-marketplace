import { Schema, model } from 'mongoose'

const usersSchema = new Schema({
	address: {
		type: String,
		require: true
	},
	data: {
		type: Object,
		require: true
	},
})

export const Users = model('users', usersSchema)