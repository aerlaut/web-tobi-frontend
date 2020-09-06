import React from 'react'
import { useDispatch } from 'react-redux'

export default function ({ content = '', idx, mode = 'view' }) {
	const type = 'short_text_answer'
	const dispatch = useDispatch()

	function updateField(content) {
		dispatch({
			type: 'question/updateField',
			payload: {
				idx: idx,
				type: type,
				content: content,
			},
		})
	}

	return (
		<>
			{mode === 'view' ? (
				<div>
					<p className='my-2 inline-block'>{content.question}</p>
					<span className='float-right inline-block'>
						{mode === 'view' ? (
							<>
								Score
								<span className='border border-gray-800 rounded ml-4 mb-4 w-12 px-2 py-1'>
									{content.score}
								</span>
							</>
						) : (
							''
						)}
					</span>
				</div>
			) : (
				<>
					<input
						type='text'
						value={content.label}
						placeholder='Soal no.'
						className='border rounded my-2 w-full px-2 py-1 my-2'
						onChange={(e) => updateField({ label: e.target.value })}
					/>

					<input
						type='text'
						value={content.question}
						placeholder='Text pernyataan disini'
						className='border rounded my-2 w-full px-2 py-1 my-2'
						onChange={(e) => updateField({ question: e.target.value })}
					/>
				</>
			)}
			<input
				type='text'
				value=''
				disabled={mode != 'exam'}
				className='border rounded border-black w-full'
			/>
			{mode === 'edit' ? (
				<div className='float-right mt-2'>
					Score
					<input
						type='text'
						value={content.score}
						className='border border-gray-800 rounded ml-4 mb-4 w-12 px-2 py-1'
						onChange={(e) => updateField({ score: e.target.value })}
					/>
				</div>
			) : (
				''
			)}
		</>
	)
}
