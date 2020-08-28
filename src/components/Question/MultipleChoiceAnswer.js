import React from 'react'
import { useDispatch } from 'react-redux'
import XCircle from '../../icons/XCircle'
import PlusCircle from '../../icons/PlusCircle'

export default function ({ content, idx, mode = 'view' }) {
	const type = 'multiple_choice_answer'
	const dispatch = useDispatch()

	// Update field
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

	// Update options text
	function updateOption(option_idx, content) {
		dispatch({
			type: 'question/updateOption',
			payload: {
				idx: idx,
				type: type,
				option_idx: option_idx,
				content: content,
			},
		})
	}

	// Add new option
	function addOption() {
		dispatch({
			type: 'question/addOption',
			payload: {
				idx: idx,
				type: type,
				content: {
					text: 'Text option',
					idx: 1,
					is_correct: false,
				},
			},
		})
	}

	// Delete option
	function deleteOption(option_idx) {
		dispatch({
			type: 'question/deleteOption',
			payload: {
				idx: idx,
				type: type,
				option_idx: option_idx,
			},
		})
	}

	return (
		<>
			{mode === 'view' ? (
				<div>
					<p className='my-2 inline-block'>{content.label}</p>
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
				<input
					type='text'
					value={content.label}
					className='border rounded my-2 w-full px-2 py-1 my-2'
					onChange={(e) => updateField({ label: e.target.value })}
				/>
			)}

			{content.options.map((el, option_idx) => (
				<div className='flex mb-2' key={`${idx}_${option_idx}`}>
					{mode !== 'edit' ? (
						''
					) : (
						<span
							key={`o_${option_idx}`}
							className='inline-block cursor-pointer align-top'
							onClick={() => {
								deleteOption(option_idx)
							}}
						>
							<XCircle color='white' fill='red' />
						</span>
					)}
					<input
						type='checkbox'
						key={`c_${option_idx}`}
						value={el.idx}
						name={`${idx}_${el.idx}`}
						className='ml-1 mt-1 mr-2'
						checked={el.is_correct}
						readOnly={mode === 'view'}
						onChange={(e) => {
							if (mode === 'edit') {
								updateOption(option_idx, { is_correct: e.target.checked })
							}
						}}
					/>
					{mode !== 'edit' ? (
						<p>{el.text}</p>
					) : (
						<textarea
							key={`t_${option_idx}`}
							style={{ maxWidth: 'calc(100% - 50px)' }}
							className='border rounded w-full px-2 py-1'
							onChange={(e) =>
								updateOption(option_idx, { text: e.target.value })
							}
							value={el.text}
						></textarea>
					)}
				</div>
			))}
			<div className='flex mb-2'>
				{mode !== 'edit' ? (
					''
				) : (
					<span
						className='inline-block cursor-pointer align-top'
						onClick={() => addOption()}
					>
						<PlusCircle
							color='white'
							fill='green'
							className='mr-2 inline-block'
						/>
						Add option
					</span>
				)}
			</div>
			{mode === 'edit' ? (
				<div class='float-right mt-2'>
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
