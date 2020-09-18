import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useAuth, fetchPageData } from '../../helpers'
import Error from '../../components/Error'
import Field from '../../components/Question/Field'
import FieldOption from '../../components/Question/FieldOption'
import TagInput from '../../components/TagInput'

import { useSelector, useDispatch } from 'react-redux'

export default function () {
	const history = useHistory()
	const [error, setError] = useState('')
	const dispatch = useDispatch()
	const [topicOptions, setTopicOptions] = useState([])
	const [subtopicOptions, setSubtopicOptions] = useState([])

	// Redux states
	const question = useSelector((state) => state.question)

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
		fetchPageData({ auth: true }, (res) => {
			if (res.status !== 'ok') {
				setError({ type: 'error', message: res.message })
			} else {
				// Setting information

				let initTopics = []
				let initSubtopics = []

				res.data.topics.forEach((t) => {
					if (t.type == 'topic') {
						initTopics.push({ id: t._id, name: t.name, type: t.type })
					} else if (t.type == 'subtopic') {
						initSubtopics.push({ id: t._id, name: t.name, type: t.type })
					}
				})

				setTopicOptions(initTopics)
				setSubtopicOptions(initSubtopics)
			}
		})
		// Reset all redux states
		dispatch({
			type: 'question/reset',
		})
	}, [])

	function saveQuestion() {
		let postdata = {
			author: question.author,
			description: question.description,
			tier: question.tier,
			maxScore: question.maxScore,
			isOfficial: question.isOfficial,
			difficulty: question.difficulty,
			contents: question.contents,
			isPublished: question.isPublished,
			topics: question.topics,
			subtopics: question.subtopics,
		}

		// Question switched to published
		if (question.isPublished) postdata.publishedAt = Date.now()

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

	function updateMeta(content) {
		dispatch({
			type: 'question/updateMeta',
			payload: {
				content: content,
			},
		})
	}

	function setQuestionTopics(newTopics) {
		dispatch({
			type: 'question/updateMeta',
			payload: {
				content: {
					topics: newTopics,
				},
			},
		})
	}

	function setQuestionSubtopics(newSubtopics) {
		dispatch({
			type: 'question/updateMeta',
			payload: {
				content: {
					subtopics: newSubtopics,
				},
			},
		})
	}

	return (
		useAuth() && (
			<>
				{error && <Error type={error.type} message={error.message} />}
				<h1 className='text-xl font-bold mb-4'>
					Buat Soal Baru
					<span
						className='bg-green-600 px-2 py-1 text-white font-bold float-right cursor-pointer rounded'
						onClick={() => saveQuestion()}
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
								value={question.author}
								onChange={(e) => updateMeta({ author: e.target.value })}
							></input>
						</label>

						<label className='my-2'>
							<span className='w-2/12 inline-block'>Tier</span>
							<select
								onChange={(e) => updateMeta({ tier: e.target.value })}
								value={question.tier}
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
								value={question.isOfficial}
								onChange={(e) => updateMeta({ isOfficial: e.target.value })}
								className='border rounded p-1 border-black w-2/12'
							>
								<option value={true}>Yes</option>
								<option value={false}>No</option>
							</select>
						</label>

						<label className='my-2'>
							<span className='w-2/12 inline-block'>Published?</span>
							<select
								value={question.isPublished}
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
							<span className='w-2/12 inline-block'>Difficulty</span>
							<input
								type='range'
								className='w-2/12 p-1 border border-black shadow-inside rounded'
								min='1'
								max='5'
								value={question.difficulty}
								onChange={(e) => updateMeta({ difficulty: e.target.value })}
							></input>
						</label>

						<label className='my-2'>
							<span className='w-3/12 inline-block'>Maximum Score</span>
							<input
								type='text'
								className='w-1/12 p-1 border border-black shadow-inside rounded cursor-default'
								value={question.maxScore}
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
					<TagInput
						tags={question.topics}
						setTags={setQuestionTopics}
						suggestions={topicOptions}
						width={'w-full'}
						minInputLength={1}
					/>
				</div>

				<div className='my-2'>
					<strong>Subtopics</strong>
					<TagInput
						tags={question.subtopics}
						setTags={setQuestionSubtopics}
						suggestions={subtopicOptions}
						width={'w-full'}
						minInputLength={1}
					/>
				</div>

				{/* Question body */}
				<strong>Pertanyaan</strong>
				{question.contents.map((field, idx) => (
					<>
						<Field
							type={field.type}
							key={`field_${idx}`}
							content={field.content}
							idx={idx}
							mode='edit'
						/>
						<FieldOption key={`opt-${idx}`} idx={idx} />
					</>
				))}
			</>
		)
	)
}
