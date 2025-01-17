import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import TextLabel from './TextLabel'
import ShortTextAnswer from './ShortTextAnswer'
import FileUploadAnswer from './FileUploadAnswer'
import TextAnswer from './TextAnswer'
import SingleChoiceAnswer from './SingleChoiceAnswer'
import MultipleChoiceAnswer from './MultipleChoiceAnswer'
import MultipleTrueFalseAnswer from './MultipleTrueFalseAnswer'
import ChevronUp from '../../icons/ChevronUp'
import ChevronDown from '../../icons/ChevronDown'

export default function ({
	type = 'text_label',
	content = null,
	idx,
	mode = 'view', // view, exam, edit
}) {
	const dispatch = useDispatch()
	const fieldRef = useRef()
	const role = useSelector((state) => state.auth.role)

	const [fieldType, setFieldType] = useState(type)

	const labels = [
		'text_label',
		'-------------------',
		'long_text_answer',
		'short_text_answer',
		'single_choice_answer',
		'multiple_choice_answer',
		'multiple_true_false_answer',
		'file_upload_answer',
	]

	// Default field content
	function defaultFieldContent(type) {
		let defaultFieldContent = ''
		switch (type) {
			case 'single_choice_answer':
			case 'multiple_choice_answer':
			case 'multiple_true_false_answer':
				defaultFieldContent = {
					label: 'Soal no.',
					question: 'Text pertanyaan disini',
					options: [
						{ text: 'Option A', idx: 1, is_correct: null },
						{ text: 'Option B', idx: 2, is_correct: null },
						{ text: 'Option C', idx: 3, is_correct: null },
						{ text: 'Option D', idx: 4, is_correct: null },
					],
					score: 0,
				}
				break

			case 'text_label':
				defaultFieldContent = {
					label: '',
				}
				break

			default:
				defaultFieldContent = {
					label: 'Soal no.',
					question: 'Text pertanyaan disini',
					score: 0,
				}
				break
		}

		return defaultFieldContent
	}

	// Hook for changing field types
	function switchField() {
		// Update redux state. Updated state will update the component
		dispatch({
			type: 'question/switchField',
			payload: {
				idx: idx,
				type: fieldType,
				content: defaultFieldContent(fieldType),
			},
		})
	}

	// If content === null, use default value
	if (content === null) {
		defaultFieldContent(type)
	}

	// field is a placeholder for element
	let field = null
	switch (type) {
		case 'text_label':
			field = <TextLabel content={content} idx={idx} mode={mode} />
			break

		case 'long_text_answer':
			field = <TextAnswer content={content} idx={idx} mode={mode} />
			break

		case 'short_text_answer':
			field = <ShortTextAnswer content={content} idx={idx} mode={mode} />
			break

		case 'file_upload_answer':
			field = <FileUploadAnswer content={content} idx={idx} mode={mode} />
			break

		case 'single_choice_answer':
			field = (
				<SingleChoiceAnswer
					content={content !== null ? content : defaultFieldContent(type)}
					idx={idx}
					mode={mode}
				/>
			)
			break

		case 'multiple_choice_answer':
			field = (
				<MultipleChoiceAnswer
					content={content !== null ? content : defaultFieldContent(type)}
					idx={idx}
					mode={mode}
				/>
			)
			break

		case 'multiple_true_false_answer':
			field = (
				<MultipleTrueFalseAnswer
					content={content !== null ? content : defaultFieldContent(type)}
					idx={idx}
					mode={mode}
				/>
			)
			break
	}

	return (
		<div className='mb-8 p-4 bg-gray-100 rounded clearfix'>
			<div className='clearfix'>
				{/* Show label if not in edit mode */}
				{type.match(/.*_answer/g) && mode !== 'edit' ? (
					<label className='font-bold'>{content.label}</label>
				) : (
					''
				)}

				{/* Disable switch if not in edit mode */}
				{mode === 'edit' && (role === 'superadmin' || role === 'admin') ? (
					<>
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
							onClick={switchField}
						>
							Switch
						</span>
						<select
							className='float-right px-2 py-1 mr-2 rounded border-gray-800 border capitalize'
							value={fieldType}
							onChange={(e) => setFieldType(e.target.value)}
						>
							{labels.map((field, idx) => (
								<option value={field} key={`option_${idx}`}>
									{field.split('_').join(' ')}
								</option>
							))}
						</select>

						{/* Button move up */}
						<button
							onClick={(e) => {
								dispatch({
									type: 'question/moveFieldDown',
									payload: {
										idx: idx,
									},
								})
							}}
						>
							<ChevronDown />
						</button>

						{/* Button move down */}
						<button
							onClick={(e) => {
								dispatch({
									type: 'question/moveFieldUp',
									payload: {
										idx: idx,
									},
								})
							}}
						>
							<ChevronUp />
						</button>
					</>
				) : (
					''
				)}
			</div>
			{field}
		</div>
	)
}
