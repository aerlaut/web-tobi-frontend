import React from 'react'
import { useDispatch } from 'react-redux'

import TextLabel from './TextLabel'
import ShortTextAnswer from './ShortTextAnswer'
import TextAnswer from './TextAnswer'
import SingleChoiceAnswer from './SingleChoiceAnswer'
import MultipleChoiceAnswer from './MultipleChoiceAnswer'

export default function ({ type = 'text', content = '', idx }) {
	const dispatch = useDispatch()

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
			field = <SingleChoiceAnswer content={content} idx={idx} />
			break

		case 'multiple_choice_answer':
			field = <MultipleChoiceAnswer content={content} idx={idx} />
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
			</div>
			{field}
		</div>
	)
}
