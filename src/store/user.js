import { createSlice } from '@reduxjs/toolkit'

export default createSlice({
	name: 'user',
	initialState: {
		username: '',
		fullname: '',
		createdAt: '',
		updatedAt: '',
		address: '',
		city: '',
		province: '',
		country: '',
		grade: '',
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
				fullname: '',
				createdAt: '',
				updatedAt: '',
				address: '',
				city: '',
				province: '',
				country: '',
				grade: '',
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
			const { data } = action.payload

			Object.keys(data).forEach((key, idx) => {
				state[key] = data[key]
			})
		},
	},
})
