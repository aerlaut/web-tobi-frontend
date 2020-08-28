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
				<p>{content.label}</p>
			) : (
				<input
					type='text'
					value={content.label}
					className='border rounded w-full my-2 px-2 py-1 my-2'
					onChange={(e) => updateField({ label: e.target.value })}
				/>
			)}
			<input
				type='text'
				value=''
				disabled={mode != 'exam'}
				className='border rounded border-black w-full'
			/>
			<div className='mt-4 float-right'>
				{mode === 'exam' ? (
					''
				) : mode === 'view' ? (
					<>
						Score
						<span className='border border-gray-800 rounded ml-4 w-12 px-2 py-1'>
							{content.score}
						</span>
					</>
				) : (
					<>
						Score
						<input
							type='text'
							value={content.score}
							className='border border-gray-800 rounded ml-4 w-12 px-2 py-1'
							onChange={(e) => updateField({ score: e.target.value })}
						/>
					</>
				)}
			</div>
		</>
	)
}
