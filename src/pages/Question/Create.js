import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { auth, getPageData } from '../../helpers'
import Error from '../../components/Error'
import Field from '../../components/Question/Field'
import FieldOption from '../../components/Question/FieldOption'

import { useSelector, useDispatch } from 'react-redux'

export default function () {
	const history = useHistory()
	const [error, setError] = useState('')
	const dispatch = useDispatch()

	const author = useSelector((state) => state.author)
	const tier = useSelector((state) => state.tier)
	const maxScore = useSelector((state) => state.maxScore)
	const isOfficial = useSelector((state) => state.isOfficial)
	const isPublished = useSelector((state) => state.isPublished)
	const difficulty = useSelector((state) => state.difficulty)
	const updatedAt = useSelector((state) => state.updatedAt)
	const createdAt = useSelector((state) => state.createdAt)
	const contents = useSelector((state) => state.contents)

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
		getPageData((res) => {
			if (res !== 'ok') {
				setError({ type: 'error', message: res.message })
			} else {
				// Setting information
			}
		})
	})

	function saveQuestion(e) {
		e.preventDefault()
		// Submit form
		fetch(`${process.env.REACT_APP_API_URL}/question/create`, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify({
				author: author,
				tier: tier,
				createdAt: Date.now(),
				maxScore: maxScore,
				isOfficial: isOfficial,
				difficulty: difficulty,
				body: contents,
				isPublished: isPublished,
			}),
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
		auth(history) && (
			<>
				{error && <Error type={error.type} message={error.message} />}
				<h1 className='text-xl font-bold mb-4'>
					Buat Soal Baru
					<span
						class='bg-green-600 px-2 py-1 text-white font-bold float-right cursor-pointer rounded'
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
								value={author}
								onChange={(e) => {
									dispatch({
										type: 'question/setAuthor',
										payload: { content: e.target.value },
									})
								}}
							></input>
						</label>

						<label className='my-2'>
							<span className='w-2/12 inline-block'>Tier</span>
							<select
								onChange={(e) =>
									dispatch({
										type: 'question/setTier',
										payload: { content: e.target.value },
									})
								}
								value={tier}
								className='border rounded p-1 border-black w-2/12'
							>
								{tiers.map((t) => (
									<option key={t.value} value={t.value}>
										{t.name}
									</option>
								))}
							</select>
						</label>

						<label className='my-2'>
							<span className='w-2/12 inline-block'>Official?</span>
							<select
								value={isOfficial}
								onChange={(e) =>
									dispatch({
										type: 'question/setOfficial',
										payload: { content: e.target.value },
									})
								}
								className='border rounded p-1 border-black w-2/12'
							>
								<option value={true}>Yes</option>
								<option value={false}>No</option>
							</select>
						</label>

						<label className='my-2'>
							<span className='w-2/12 inline-block'>Published?</span>
							<select
								value={isOfficial}
								onChange={(e) =>
									dispatch({
										type: 'question/setPublished',
										payload: { content: e.target.value },
									})
								}
								className='border rounded p-1 border-black w-2/12'
							>
								<option value={true}>Yes</option>
								<option value={false}>No</option>
							</select>
						</label>
					</div>
					<div className='w-1/2 flex flex-col'>
						<label className='my-2'>
							<span className='w-2/12 inline-block'>Difficulty</span>
							<input
								type='range'
								className='w-2/12 p-1 border border-black shadow-inside rounded'
								min='1'
								max='5'
								value={difficulty}
								onChange={(e) =>
									dispatch({
										type: 'question/setDifficulty',
										payload: { content: e.target.value },
									})
								}
							></input>
						</label>

						<label className='my-2'>
							<span className='w-3/12 inline-block'>Maximum Score</span>
							<input
								type='text'
								className='w-1/12 p-1 border border-black shadow-inside rounded'
								value={maxScore}
								onChange={(e) =>
									dispatch({
										type: 'question/setMaxScore',
										payload: { content: e.target.value },
									})
								}
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

				{/* Question body */}
				<strong>Pertanyaan</strong>
				{contents.map((field, idx) => (
					<>
						<Field
							type={field.type}
							key={`field-${idx}`}
							content={field.content}
							idx={idx}
						/>
						<FieldOption key={`opt-${idx}`} idx={idx} />
					</>
				))}
			</>
		)
	)
}
