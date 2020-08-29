import { createSlice } from '@reduxjs/toolkit'

export default createSlice({
	name: 'error',
	initialState: {
		show: false,
		message: '',
		code: '',
		type: '',
	},
	reducers: {
		close: (state, action) => {
			state.show = false
		},
		show: (state, action) => {
			const { type, message, code } = action.payload

			state.show = true
			state.message = message
			state.type = type
			state.code = code
		},
	},
})
