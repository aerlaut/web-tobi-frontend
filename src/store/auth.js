import { createSlice } from '@reduxjs/toolkit'

export default createSlice({
	name: 'auth',
	initialState: {
		isAuth: false,
		username: null,
		role: null,
		id: null,
		_id: null,
	},
	reducers: {
		logUserIn: (state, action) => {
			const { username, role, id, _id } = action.payload

			state.isAuth = true
			state.username = username
			state.role = role
			state.id = id
			state._id = _id
		},
		logUserOut: (state) => {
			state.isAuth = false
			state.username = null
			state.role = null
			state.id = null
			state._id = null
		},
	},
})
