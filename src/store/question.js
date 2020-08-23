import { createSlice } from '@reduxjs/toolkit'

let slice = createSlice({
	name: 'question',
	initialState: {
		author: '',
		tier: '',
		maxScore: '',
		isOfficial: false,
		difficulty: '',
		isPublished: false,
		contents: [
			// {
			// 	type: 'text_label',
			// 	content: 'This is a question',
			// },
			// {
			// 	type: 'short_text_answer',
			// 	content: 'Tulis jawaban Anda dibawah ini',
			// },
			// {
			// 	type: 'text_answer',
			// 	content: 'Tulis alasan Anda dibawah ini',
			// },
			// {
			// 	type: 'single_choice_answer',
			// 	content: {
			// 		label: 'Pilih salah satu jawaban dibawah ini',
			// 		options: [
			// 			{ text: 'Option A', idx: 1, is_correct: false },
			// 			{ text: 'Option B', idx: 2, is_correct: false },
			// 			{ text: 'Option C', idx: 3, is_correct: false },
			// 			{ text: 'Option D', idx: 4, is_correct: false },
			// 		],
			// 	},
			// },
			{
				type: 'multiple_choice_answer',
				content: {
					label: 'Pilih salah satu jawaban dibawah ini',
					options: [
						{ text: 'Option A', idx: 1, is_correct: false },
						{ text: 'Option B', idx: 2, is_correct: false },
						{ text: 'Option C', idx: 3, is_correct: false },
						{ text: 'Option D', idx: 4, is_correct: false },
					],
				},
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
			if (type == 'single_choice_answer' || type == 'multiple_choice_answer') {
				state.contents[idx].content.label = content.label
			} else {
				state.contents[idx].content = content
			}
		},
		// Update option in a field
		updateOption: (state, action) => {
			const { idx, type, option_idx, content } = action.payload
			state.contents[idx].content.options[option_idx].text = content
		},
		// Remove option in a field
		deleteOption: (state, action) => {
			const { idx, type, option_idx, content } = action.payload
			state.contents[idx].content.options.splice(option_idx, 1)
		},
	},
})

// testing
export default slice
