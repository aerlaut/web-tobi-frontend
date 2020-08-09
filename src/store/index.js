import { configureStore } from '@reduxjs/toolkit'
import { combineReducer } from 'redux'

import QuestionSlice from './question'

// let reducers = combineReducer({
//   QuestionSlice.reducer,
// })

let store = configureStore({
  reducer: QuestionSlice.reducer,
})

export default store
