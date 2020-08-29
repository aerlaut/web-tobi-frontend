import { createSlice } from '@reduxjs/toolkit'

export default createSlice({
	name: 'user',
	initialState: {
		username: '',
		fullName: '',
		createdAt: '',
		updatedAt: '',
		address: '',
		city: '',
		province: '',
		country: '',
		school: '',
		mobileNo: '',
		email: '',
		role: '',
		isVerified: false,
		emailVerified: false,
		roles: [
			{
				name: 'Admin',
				value: 'admin',
			},
			{
				name: 'User',
				value: 'user',
			},
		],
	},
	reducers: {
		// Reset all fields
		reset: (state, action) => {
			const inits = {
				username: '',
				fullName: '',
				createdAt: '',
				updatedAt: '',
				address: '',
				city: '',
				province: '',
				country: '',
				school: '',
				mobileNo: '',
				email: '',
				role: 'user',
				isVerified: false,
				emailVerified: false,
			}

			for (const [key, value] of Object.entries(inits)) {
				state[key] = value
			}
		},

		// Update field
		update: (state, action) => {
			const { attr, content } = action.payload
			state[attr] = content
		},

		// Load question object into redux
		load: (state, action) => {
			const { question } = action.payload

			Object.keys(question).forEach((key, idx) => {
				state[key] = question[key]
			})
		},
	},
})
