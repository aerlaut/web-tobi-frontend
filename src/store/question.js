import { createSlice } from '@reduxjs/toolkit'

export default createSlice({
	name: 'question',
	initialState: {
		author: '',
		tier: '',
		maxScore: '',
		isOfficial: false,
		difficulty: '',
		isPublished: false,
		description: '',
		contents: [
			{
				type: 'text_label',
				content: 'This is a question',
			},
		],
	},
	reducers: {
		setAuthor: (state, action) => {
			state.author = action.payload.content
		},

		setTier: (state, action) => {
			state.tier = action.payload.content
		},

		setMaxScore: (state, action) => {
			state.maxScore = action.payload.content
		},

		setOfficial: (state, action) => {
			state.isOfficial = action.payload.content
		},

		setPublished: (state, action) => {
			state.isPublished = action.payload.content
		},

		setDifficulty: (state, action) => {
			state.difficulty = action.payload.content
		},

		setDescription: (state, action) => {
			state.description = action.payload.content
		},

		addField: (state, action) => {
			const { type, idx } = action.payload

			// Create new field object
			let field = { type: type, content: '' }
			state.contents.splice(idx + 1, 0, field)
		},
		// Remove field
		removeField: (state, action) => {
			const { idx } = action.payload
			state.contents.splice(idx, 1)
		},
		// Update field
		updateField: (state, action) => {
			const { idx, type, content } = action.payload

			Object.keys(content).forEach((key) => {
				state.contents[idx].content[key] = content[key]
			})
		},
		// Switch field type to something else
		switchField: (state, action) => {
			const { idx, type, content } = action.payload
			state.contents[idx].type = type
			state.contents[idx].content = content
		},
		// Update option in a field
		addOption: (state, action) => {
			const { idx, type, content } = action.payload
			state.contents[idx].content.options.push(content)
			reindexOptions(state.contents[idx].content.options)
		},
		// Update option label in a field
		updateOption: (state, action) => {
			const { idx, type, option_idx, content } = action.payload

			// Reset radio values if value is changed
			if (
				type === 'single_choice_answer' &&
				content.hasOwnProperty('is_correct')
			) {
				resetRadioValues(state.contents[idx].content.options)
			}

			// Update values
			state.contents[idx].content.options[option_idx] = Object.assign(
				state.contents[idx].content.options[option_idx],
				content
			)
			reindexOptions(state.contents[idx].content.options)
		},
		// Remove option in a field
		deleteOption: (state, action) => {
			const { idx, type, option_idx } = action.payload

			state.contents[idx].content.options.splice(option_idx, 1)
			reindexOptions(state.contents[idx].content.options)
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

// Helper function to reindex options
function reindexOptions(options) {
	options.forEach((opt, idx) => {
		opt.idx = idx + 1 // Start from 1
	})
}

// Helper function to reset values of radio options when changed
function resetRadioValues(options) {
	options.forEach((opt, idx) => {
		opt.is_correct = false
	})
}
