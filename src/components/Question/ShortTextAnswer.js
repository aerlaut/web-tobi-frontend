import React from 'react'
import { useDispatch } from 'react-redux'

export default function ({ content, idx }) {
	let type = 'short_text_answer'
	const dispatch = useDispatch()

	return (
		<>
			<input
				type='text'
				value={content}
				className='border rounded w-full my-2 px-2 py-1 my-2'
				onChange={(e) => {
					dispatch({
						type: 'question/updateField',
						payload: {
							idx: idx,
							type: type,
							content: e.target.value,
						},
					})
				}}
			/>
			<input
				type='text'
				value=''
				disabled
				className='border rounded border-black w-full'
			/>
		</>
	)
}
