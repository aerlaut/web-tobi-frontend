import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import Upload from '../../icons/Upload'
import cx from 'classnames'

export default function ({ content = '', idx, mode = 'view' }) {
	let type = 'file_upload_answer'
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

	function fileUploadHandler(e) {
		let file = e.target.files[0]

		const formData = new FormData()
		formData.append('file', file)

		fetch(`${process.env.REACT_APP_API_URL}/file/store`, {
			method: 'POST',
			headers: new Headers({
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			}),
			body: formData,
		})
			.then((res) => {
				// TODO : handle data upload
				console.log(res.data)
			})
			.catch((err) => console.error(err))
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

					<div class='overflow-hidden relative mt-2'>
						<button
							className={cx('font-bold px-4 py-2 rounded', {
								'bg-blue-600 text-white': mode === 'answer',
								'bg-gray-600 text-gray-400 opacity-50': mode !== 'answer',
							})}
						>
							<Upload
								color={cx({
									white: mode === 'answer',
									'#CBD5E0': mode !== 'answer',
								})}
								className='inline-block font-bold'
								size={20}
							/>
							Upload file
						</button>
						<input
							type='file'
							onChange={(e) => fileUploadHandler(e)}
							disabled={mode !== 'answer'}
							className='opacity-0 cursor-pointer absolute block '
						/>
					</div>
				</>
			)}
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
