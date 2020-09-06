import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useAuth, fetchPageData } from '../../helpers'
import Error from '../../components/Error'
import Field from '../../components/Question/Field'
import FieldOption from '../../components/Question/FieldOption'
import moment from 'moment'

import { useSelector, useDispatch } from 'react-redux'

export default function () {
	const history = useHistory()
	const dispatch = useDispatch()
	const { id } = useParams()

	// Local state
	const [error, setError] = useState('')
	const [objectId, setObjectId] = useState('')
	const [published, setPublished] = useState('')
	const [createdAt, setCreatedAt] = useState('')
	const [updatedAt, setUpdatedAt] = useState('')

	// Redux states
	const author = useSelector((state) => state.question.author)
	const tier = useSelector((state) => state.question.tier)
	const maxScore = useSelector((state) => state.question.maxScore)
	const isOfficial = useSelector((state) => state.question.isOfficial)
	const isPublished = useSelector((state) => state.question.isPublished)
	const difficulty = useSelector((state) => state.question.difficulty)
	const contents = useSelector((state) => state.question.contents)
	const description = useSelector((state) => state.question.description)

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
		fetchPageData({ auth: true }, (res) => {
			if (res.status !== 'ok') {
				setError({ type: 'error', message: res.message })
			} else {
				// Get some status for updating

				setObjectId(res.data._id)
				setPublished(res.data.isPublished)
				setCreatedAt(res.data.createdAt)
				setUpdatedAt(res.data.updatedAt)

				// Push question to redux
				dispatch({
					type: 'question/loadQuestion',
					payload: {
						question: res.data,
					},
				})
			}
		})
	}, [])

	function updateQuestion(e) {
		e.preventDefault()

		let postdata = {
			_id: objectId,
			author: author,
			description: description,
			tier: tier,
			maxScore: maxScore,
			isOfficial: isOfficial,
			difficulty: difficulty,
			contents: contents,
			isPublished: isPublished,
			updatedAt: Date.now(),
		}

		// Question switched to published
		if (!published && isPublished) postdata.publishedAt = Date.now()

		// Submit form
		fetch(`${process.env.REACT_APP_API_URL}/question/${id}/edit`, {
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
					history.push(`/question/${id}`)
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
					<span
						className='bg-green-600 px-2 py-1 text-white font-bold float-right cursor-pointer rounded text-base'
						onClick={(e) => updateQuestion(e)}
					>
						Update
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
									<option key={`tier_${t.value}`} value={t.value}>
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
								value={isPublished}
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
								className='w-1/12 p-1 border border-black shadow-inside rounded cursor-default'
								value={maxScore}
								readOnly={true}
							></input>
						</label>

						<label className='my-2'>
							<span className='w-3/12 inline-block'>Created</span>
							<span>
								{moment
									.utc(createdAt)
									.utcOffset('+07:00')
									.format('YYYY-MM-DD HH:mm:ss [WIB]')}
							</span>
						</label>

						<label className='my-2'>
							<span className='w-3/12 inline-block'>Last Update</span>
							<span>
								{moment
									.utc(updatedAt)
									.utcOffset('+07:00')
									.format('YYYY-MM-DD HH:mm:ss [WIB]')}
							</span>
						</label>
					</div>
				</div>
				<div className='my-2'>
					<strong>Description</strong>
					<textarea
						className='rounded border border-black block w-full px-2 py-1'
						rows={3}
						value={description}
						onChange={(e) => {
							dispatch({
								type: 'question/setDescription',
								payload: { content: e.target.value },
							})
						}}
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

				{/* Question body */}
				<strong>Pertanyaan</strong>
				{contents.map((field, idx) => (
					<>
						<Field
							type={field.type}
							key={`q_${idx}`}
							content={field.content}
							idx={idx}
							mode='edit'
						/>
						<FieldOption key={`opt_${idx}`} idx={idx} />
					</>
				))}
			</>
		)
	)
}
