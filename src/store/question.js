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
        type: 'question_text',
        content: 'This is a question',
      },
      {
        type: 'answer_short_text',
        content: 'Tulis jawaban Anda dibawah ini',
      },
    ],
  },
  reducers: {
    setAuthor: (state, action) =>
      Object.assign(state, { author: action.payload.content }),

    setTier: (state, action) =>
      Object.assign(state, { tier: action.payload.content }),

    setMaxScore: (state, action) =>
      Object.assign(state, { maxScore: action.payload.content }),

    setOfficial: (state, action) =>
      Object.assign(state, { official: action.payload.content }),

    setDifficulty: (state, action) =>
      Object.assign(state, { difficulty: action.payload.content }),

    addField: (state, action) => {
      const { type, idx } = action.payload

      // Create new field object
      let field = {}
      if (type === 'text') {
        field = {
          type: type,
          content: '',
        }
      } else if (type === 'answer') {
        field = {
          type: type,
          content: {
            type: 'short_text',
            label: '',
          },
        }
      }

      // Add new field
      let newContent = []
      if (idx === 0) {
        // If add at start
        newContent = [field, ...state.content]
      } else if (idx === state.content.length - 1) {
        // If add at end
        newContent = [...state.content, field]
      } else {
        newContent = [
          ...state.content.slice(0, idx),
          field,
          ...state.content.slice(idx + 1, 0),
        ]
      }

      return Object.assign(state, {
        content: newContent,
      })
    },
    // Remove question field
    removeField: (state, action) => {
      const { idx } = action.payload

      // Remove object at index
      let newContent = []
      if (idx == 0) {
        // If delete at start
        newContent = state.content.slice(1)
      } else if (idx == state.content.length - 1) {
        // delete at end
        newContent = state.content.slice(0, idx - 1)
      } else {
        newContent = [
          ...state.content.slice(0, idx),
          ...state.content.slice(idx + 1),
        ]
      }

      return Object.assign(state, { content: newContent })
    },
    // Update question field
    updateField: (state, action) => {
      const { idx, content, type } = action.payload


      let field = Object.assign(state.content[idx], {
        type : type,
        content : content
      })

      // Update object at index
      let newContent = [
        ...state.content.slice(0, idx),
        field,
        ...state.content.slice(idx+1)
      ]

      console.log(newContent)


      return Object.assign(state, { content: newContent })
    },
  },
})

// testing
export default slice
