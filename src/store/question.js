import { createSlice } from '@reduxjs/toolkit'

let slice = createSlice({
  name: 'question',
  initialState: {
    author: '',
    tier: '',
    maxScore: '',
    official: true,
    difficulty: '',
    content: [
      {
        type: 'text',
        content: 'This is a question',
      },
      {
        type: 'answer',
        content: {
          type: 'short_text',
          label: 'Tulis jawaban Anda dibawah ini',
        },
      },
    ],
  },
  reducers: {
    setAuthor: (state, payload) => payload.content,
    setTier: (state, payload) => payload.content,
    setMaxScore: (state, payload) => payload.content,
    setOfficial: (state, payload) => payload.content,
    setDifficulty: (state, payload) => payload.content,
    addField: {
      reducer: {},
      prepare: {},
    },
    removeField: {
      reducer: {},
      prepare: {},
    },
    updateField: {
      reducer: {},
      prepare: {},
    },
  },
})

const { actions, reducer } = slice
console.log(actions)

// testing
export default slice
