import { createSlice } from '@reduxjs/toolkit'

export default createSlice({
	name: 'questionSet',
	initialState: {
		author: '',
		tier: '',
		maxScore: '',
		isOfficial: false,
		difficulty: '',
		isPublished: false,
		description: '',
		canRandomOrder: false,
		contents: [],
	},
	reducers: {
		// Reset all fields
		reset: (state, action) => {
			const inits = {
				author: '',
				tier: '',
				maxScore: '',
				isOfficial: false,
				difficulty: '',
				isPublished: false,
				description: '',
				canRandomOrder: false,
				contents: [],
			}

			for (const [key, value] of Object.entries(inits)) {
				state[key] = value
			}
		},
		updateMeta: (state, action) => {
			const { content } = action.payload

			Object.keys(content).forEach((key) => {
				state[key] = content[key]
			})
		},
		addQuestion: (state, action) => {
			const { content } = action.payload

			// Add new question object
			state.contents.push(content)
		},
		// Remove field
		removeQuestion: (state, action) => {
			const { idx } = action.payload
			state.contents.splice(idx, 1)
		},
		// Update field
		updateQuestion: (state, action) => {
			const { idx, content } = action.payload

			Object.keys(content).forEach((key) => {
				state.contents[idx].content[key] = content[key]
			})

			// If score is updated, update max score
			if (content.hasOwnProperty('score')) {
				let sum = 0
				state.contents.forEach((item) => {
					if (item.content.hasOwnProperty('score')) {
						sum += parseFloat(item.content.score)
					}
				})

				state.maxScore = sum
			}
		},
		// Move field up
		moveQuestionUp: (state, action) => {
			const { idx } = action.payload

			if (idx > 0) {
				let item = state.contents.splice(idx, 1)
				state.contents.splice(idx - 1, 0, ...item)
			}
		},
		// Move field down
		moveQuestionDown: (state, action) => {
			const { idx } = action.payload

			if (idx <= state.contents.length - 1) {
				let item = state.contents.splice(idx, 1)
				state.contents.splice(idx + 1, 0, ...item)
			}
		},
		// Load question object into redux
		loadQuestion: (state, action) => {
			const { question } = action.payload

			Object.keys(question).forEach((key, idx) => {
				state[key] = question[key]
			})
		},
	},
})
