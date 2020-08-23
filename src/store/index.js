import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

import QuestionSlice from './question'
import AuthSlice from './auth'

let reducers = combineReducers({
	question: QuestionSlice.reducer,
	auth: AuthSlice.reducer,
})

let store = configureStore({
	reducer: reducers,
})

export default store
