import React from 'react'
import { useDispatch } from 'react-redux'
import XCircle from '../../icons/XCircle'
import PlusCircle from '../../icons/PlusCircle'

export default function ({ content, idx, mode = 'view' }) {
	const type = 'single_choice_answer'
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
					{mode != 'edit' ? (
						''
					) : (
						<span
							className='inline-block cursor-pointer align-top'
							onClick={() => deleteOption(option_idx)}
							key={`o_${idx}_${el.idx}`}
						>
							<XCircle color='white' fill='red' />
						</span>
					)}
					<input
						type='radio'
						value={el.idx}
						key={`${idx}_${el.idx}`}
						name={`r_${idx}`}
						className='ml-1 mt-1 mr-2'
						readOnly={mode === 'view'}
						checked={el.is_correct}
						onChange={(e) => {
							if (mode === 'edit') {
								updateOption(option_idx, { is_correct: true })
							}
						}}
					/>
					{mode != 'edit' ? (
						<p>{el.text}</p>
					) : (
						<textarea
							key={`t_${idx}_${el.idx}`}
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
						onClick={(e) => addOption()}
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
