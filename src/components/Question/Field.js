import React, { useRef } from 'react'
import { useDispatch, connect } from 'react-redux'

import TextLabel from './TextLabel'
import ShortTextAnswer from './ShortTextAnswer'
import TextAnswer from './TextAnswer'
import SingleChoiceAnswer from './SingleChoiceAnswer'
import MultipleChoiceAnswer from './MultipleChoiceAnswer'

export default function ({ type = 'text', content = null, idx }) {
	const dispatch = useDispatch()
	const fieldRef = useRef()

	const labels = [
		'text_label',
		'text_answer',
		'short_text_answer',
		'single_choice_answer',
		'multiple_choice_answer',
	]

	// Default field content
	function defaultContent(type) {
		let defaultContent = ''
		switch (type) {
			case 'single_choice_answer':
			case 'multiple_choice_answer':
				defaultContent = {
					label: 'Text label pertanyaan disini',
					options: [
						{ text: 'Option A', idx: 1, is_correct: false },
						{ text: 'Option B', idx: 2, is_correct: false },
						{ text: 'Option C', idx: 3, is_correct: false },
						{ text: 'Option D', idx: 4, is_correct: false },
					],
				}
				break

			default:
				defaultContent = 'Text label pertanyaan disini'
				break
		}

		return defaultContent
	}

	// Hook for changing field types
	function switchField() {
		let chosen = fieldRef.current.value

		// Update redux state. Updated state will update the component
		dispatch({
			type: 'question/updateField',
			payload: {
				idx: idx,
				type: chosen,
				content: defaultContent(chosen),
			},
		})
	}

	// If content == null, use default value
	if (content === null) {
		defaultContent(type)
	}

	// field is a placeholder for element
	let field = null
	switch (type) {
		case 'text_label':
			field = <TextLabel content={content} idx={idx} />
			break

		case 'text_answer':
			field = <TextAnswer content={content} idx={idx} />
			break

		case 'short_text_answer':
			field = <ShortTextAnswer content={content} idx={idx} />
			break

		case 'single_choice_answer':
			field = (
				<SingleChoiceAnswer
					content={content !== null ? content : defaultContent(type)}
					idx={idx}
				/>
			)
			break

		case 'multiple_choice_answer':
			field = (
				<MultipleChoiceAnswer
					content={content !== null ? content : defaultContent(type)}
					idx={idx}
				/>
			)
			break
	}

	return (
		<div className='my-2 p-4 bg-gray-100 rounded'>
			<div className='clearfix'>
				{type.match(/.*_answer/g) ? (
					<label className='font-bold'>Soal {idx}</label>
				) : (
					''
				)}
				<span
					className='float-right bg-red-600 text-white px-2 py-1 rounded font-bold cursor-pointer'
					onClick={(e) => {
						dispatch({
							type: 'question/removeField',
							payload: {
								idx: idx,
							},
						})
					}}
				>
					Delete
				</span>
				<span
					className='float-right px-2 py-1 mr-2 rounded bg-blue-600 text-white px-2 py-1 font-bold cursor-pointer'
					onClick={(e) => switchField()}
				>
					Switch
				</span>
				<select
					className='float-right px-2 py-1 mr-2 rounded border-gray-800 border capitalize'
					ref={fieldRef}
				>
					{labels.map((field, idx) => (
						<option value={field} key={`option_${idx}`}>
							{field.split('_').join(' ')}
						</option>
					))}
				</select>
			</div>
			{field}
		</div>
	)
}
