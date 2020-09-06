import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

import ErrorSlice from './error'
import AuthSlice from './auth'
import UserSlice from './user'
import QuestionSlice from './question'
import QuestionSetSlice from './questionSet'

let reducers = combineReducers({
	error: ErrorSlice.reducer,
	auth: AuthSlice.reducer,
	user: UserSlice.reducer,
	question: QuestionSlice.reducer,
	questionSet: QuestionSetSlice.reducer,
})

let store = configureStore({
	reducer: reducers,
})

export default store
