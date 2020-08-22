import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import XCircle from '../../icons/XCircle'
import PlusCircle from '../../icons/PlusCircle'

export default function ({ content, idx }) {
	const type = 'multiple_choice_answer'
	const dispatch = useDispatch()

	// Delete option
	function deleteOption(e, option_idx) {
		dispatch({
			type: 'question/deleteOption',
			payload: {
				idx: idx,
				type: type,
				option_idx: option_idx,
			},
		})
	}

	// Update options text
	function updateOptionText(e, option_idx) {
		dispatch({
			type: 'question/updateOption',
			payload: {
				idx: idx,
				type: type,
				option_idx: option_idx,
				content: e.target.value,
			},
		})
	}

	// Add new option
	function addOption() {
		let newOption = {
			text: '',
			idx: content.options.length,
			is_correct: false,
		}

		let newOptions = [...content.options]
		newOptions.push(newOption)

		dispatch({
			type: 'question/updateField',
			payload: {
				idx: idx,
				type: type,
				content: {
					options: newOptions,
				},
			},
		})
	}

	return (
		<>
			<input
				type='text'
				value={content.label}
				className='border rounded w-full my-2 px-2 py-1 my-2'
				onChange={(e) => {
					dispatch({
						type: 'question/updateField',
						payload: {
							idx: idx,
							type: type,
							content: {
								label: e.target.value,
							},
						},
					})
				}}
			/>

			{content.options.map((el, option_idx) => (
				<div className='flex mb-2' key={option_idx}>
					<span
						className='inline-block cursor-pointer align-top'
						onClick={(e) => deleteOption(option_idx)}
					>
						<XCircle color='white' fill='red' />
					</span>
					<input
						type='checkbox'
						value={el.idx}
						name={`${idx}_${el.idx}`}
						className='ml-1 mt-1 mr-2'
					/>
					<textarea
						style={{ maxWidth: 'calc(100% - 50px)' }}
						className='border rounded w-full px-2 py-1'
						onChange={(e) => updateOptionText(e, option_idx)}
					>
						{el.text}
					</textarea>
				</div>
			))}
			<div className='flex mb-2'>
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
			</div>
		</>
	)
}
