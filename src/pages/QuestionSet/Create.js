import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useAuth, fetchPageData } from '../../helpers'
import Error from '../../components/Error'

import { useSelector, useDispatch } from 'react-redux'

export default function () {
	const history = useHistory()
	const [error, setError] = useState('')
	const dispatch = useDispatch()

	// Redux states
	const questionSet = useSelector((state) => state.questionSet)

	const tiers = [
		{
			value: 'osk',
			name: 'OSK',
		},
		{
			value: 'osp',
			name: 'OSP',
		},
		{
			value: 'osn',
			name: 'OSN',
		},
		{
			value: 'pelatnas',
			name: 'Pelatnas',
		},
		{
			value: 'ibo',
			name: 'IBO',
		},
	]

	useEffect(() => {
		// Fetch dashboard data
		// fetchPageData((res) => {
		// 	if (res !== 'ok') {
		// 		setError({ type: 'error', message: res.message })
		// 	} else {
		// 		// Setting information
		// 	}
		// })
		// Reset all redux states
		dispatch({
			type: 'questionSet/reset',
		})
	}, [])

	function updateMeta(content) {
		dispatch({
			type: 'questionSet/updateMeta',
			payload: {
				content: content,
			},
		})
	}

	function saveQuestion(e) {
		e.preventDefault()

		let postdata = {
			author: questionSet.author,
			description: questionSet.description,
			maxScore: questionSet.maxScore,
			isOfficial: questionSet.isOfficial,
			canRandomOrder: questionSet.canRandomOrder,
			difficulty: questionSet.difficulty,
			contents: questionSet.contents,
			isPublished: questionSet.isPublished,
		}

		// Question switched to published
		if (questionSet.isPublished) postdata.publishedAt = Date.now()

		// Submit form
		fetch(`${process.env.REACT_APP_API_URL}/question/create`, {
			method: 'POST',
			headers: new Headers({
				'Content-type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			}),
			body: JSON.stringify(postdata),
		})
			.then((res) => {
				if (!res.ok) {
					throw new Error('Error creating question')
				}
				return res.json()
			})
			.then((res) => {
				if (res.status !== 'ok') {
					// Error creating question
				} else {
					// Forward to login page
					history.push('/question')
				}
			})
			.catch((err) => {
				// Show error details
				console.error(err)
			})
	}

	return (
		useAuth() && (
			<>
				{error && <Error type={error.type} message={error.message} />}
				<h1 className='text-xl font-bold mb-4'>
					Buat Set Soal Baru
					<span
						className='bg-green-600 px-2 py-1 text-white font-bold float-right cursor-pointer rounded'
						onClick={(e) => saveQuestion(e)}
					>
						Save
					</span>
				</h1>

				<div className='flex'>
					<div className='w-1/2 flex flex-col'>
						<label className='my-2'>
							<span className='w-2/12 inline-block'>Author</span>
							<input
								type='text'
								className='w-6/12 p-1 border border-black shadow-inside rounded'
								value={questionSet.author}
								onChange={(e) => updateMeta({ author: e.target.value })}
							></input>
						</label>

						<label className='my-2'>
							<span className='w-2/12 inline-block'>Official?</span>
							<select
								value={questionSet.isOfficial}
								onChange={(e) => updateMeta({ isOfficial: e.target.value })}
								className='border rounded p-1 border-black w-2/12'
							>
								<option value={true}>Yes</option>
								<option value={false}>No</option>
							</select>
						</label>

						<label className='my-2'>
							<span className='w-2/12 inline-block'>Can random?</span>
							<select
								value={questionSet.canRandomOrder}
								onChange={(e) => updateMeta({ canRandomOrder: e.target.value })}
								className='border rounded p-1 border-black w-2/12'
							>
								<option value={true}>Yes</option>
								<option value={false}>No</option>
							</select>
						</label>

						<label className='my-2'>
							<span className='w-2/12 inline-block'>Published?</span>
							<select
								value={questionSet.isPublished}
								onChange={(e) => updateMeta({ isPublished: e.target.value })}
								className='border rounded p-1 border-black w-2/12'
							>
								<option value={true}>Yes</option>
								<option value={false}>No</option>
							</select>
						</label>
					</div>
					<div className='w-1/2 flex flex-col'>
						<label className='my-2'>
							<span className='w-3/12 inline-block'>Difficulty</span>
							<input
								type='text'
								className='w-1/12 p-1 border border-black shadow-inside rounded cursor-default'
								value={questionSet.difficulty}
								readOnly={true}
							></input>
						</label>

						<label className='my-2'>
							<span className='w-3/12 inline-block'>Maximum Score</span>
							<input
								type='text'
								className='w-1/12 p-1 border border-black shadow-inside rounded cursor-default'
								value={questionSet.maxScore}
								readOnly={true}
							></input>
						</label>

						<label className='my-2'>
							<span className='w-3/12 inline-block'>Created date</span>
							<span></span>
						</label>

						<label className='my-2'>
							<span className='w-3/12 inline-block'>Last Update</span>
							<span></span>
						</label>
					</div>
				</div>
				<div className='my-2'>
					<strong>Description</strong>
					<textarea
						className='rounded border border-black block w-full px-2 py-1'
						rows={3}
						onChange={(e) => updateMeta({ description: e.target.value })}
					></textarea>
					<div></div>
				</div>
				<div className='my-2'>
					<strong>Topics</strong>
					<div
						className='rounded border border-black'
						style={{ minHeight: 2 + 'em' }}
					></div>
				</div>
				<div className='my-2'>
					<strong>Subtopics</strong>
					<div
						className='rounded border border-black'
						style={{ minHeight: 2 + 'em' }}
					></div>
				</div>
			</>
		)
	)
}
