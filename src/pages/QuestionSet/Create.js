import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { useAuth, fetchPageData } from '../../helpers'
import Error from '../../components/Error'
import ReactTags from 'react-tag-autocomplete'
import { Style } from 'react-style-tag'
import matchSorter from 'match-sorter'

import ChevronDown from '../../icons/ChevronDown'
import ChevronUp from '../../icons/ChevronUp'

import { useSelector, useDispatch } from 'react-redux'

export default function () {
	const history = useHistory()
	const [error, setError] = useState('')
	const dispatch = useDispatch()

	// Redux states
	const questionSet = useSelector((state) => state.questionSet)

	// Local states & variables
	const [showMeta, setShowMeta] = useState(true)
	const [minDifficulty, setMinDifficulty] = useState(1)
	const [maxDifficulty, setMaxDifficulty] = useState(5)
	const [questionDescription, setQuestionDescription] = useState('')
	const [tiers, setTiers] = useState([])

	const tiersOptions = [
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

	function fetchQuestions() {
		let postdata = {
			questionDescription: questionDescription,
			minDifficulty: minDifficulty,
			maxDifficulty: maxDifficulty,
		}

		fetch(`${process.env.REACT_APP_API_URL}/question/find`, {
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
				// Load questions
			})
			.catch((err) => console.error(err))
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

				<section classNames='bg-gray-100 rounded px-4 py-2 shadow'>
					<h2 className='my-2 font-bold'>Question Set Details</h2>
					{showMeta ? (
						<>
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
											onChange={(e) =>
												updateMeta({ isOfficial: e.target.value })
											}
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
											onChange={(e) =>
												updateMeta({ canRandomOrder: e.target.value })
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
											value={questionSet.isPublished}
											onChange={(e) =>
												updateMeta({ isPublished: e.target.value })
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
					) : (
						<hr className='border-black my-2' />
					)}
					<button
						className='mx-auto block px-2 py-1 border rounded bg-white border-black'
						onClick={(e) => setShowMeta(!showMeta)}
					>
						{showMeta ? (
							<>
								Hide <ChevronUp className='inline-block align-bottom' />
							</>
						) : (
							<>
								Show <ChevronDown className='inline-block align-bottom' />
							</>
						)}
					</button>
				</section>

				{/* Question Numbers */}
				<section class='bg-gray-100 rounded px-4 py-2 mt-4 shadow'>
					<h2 className='my-2 font-bold'>Questions</h2>
					<div className='flex justify-start'>
						<div className='rounded bg-green-400 relative inline-block w-8 h-8 cursor-pointer cursor-pointer mr-2 mb-2'>
							<span
								className='absolute text-white font-bold'
								style={{
									top: '50%',
									left: '50%',
									transform: 'translate(-50%, -50%)',
								}}
							>
								100
							</span>
						</div>

						<div className='rounded bg-green-400 relative inline-block w-8 h-8 cursor-pointer cursor-pointer mr-2 mb-2'>
							<span
								className='absolute text-white font-bold'
								style={{
									top: '50%',
									left: '50%',
									transform: 'translate(-50%, -50%)',
								}}
							>
								1
							</span>
						</div>
					</div>
				</section>

				{/* Search Questions */}
				<section class='bg-gray-100 rounded px-4 py-2 mt-4 shadow'>
					<h2 className='my-2 font-bold'>Search Questions</h2>
					<div className='py-2'>
						<label className='my-2'>
							<span className='w-1/12 inline-block'>Description</span>
							<input
								type='text'
								className='w-11/12 p-1 border border-black shadow-inside rounded cursor-default'
								value={questionDescription}
								onChange={(e) => setQuestionDescription(e.target.value)}
							></input>
						</label>
					</div>

					<div className='py-2'>
						<div className='w-4/12 inline-block'>
							<label className='my-2'>
								<span className='w-3/12 inline-block'>Difficulty (1-5)</span>
								<input
									type='text'
									className='w-10 p-1 border border-black shadow-inside rounded cursor-default mr-2'
									value={minDifficulty}
									onChange={(e) => setMinDifficulty(e.target.value)}
								/>
								-
								<input
									type='text'
									className='w-10 p-1 border border-black shadow-inside rounded cursor-default ml-2'
									value={maxDifficulty}
									onChange={(e) => setMaxDifficulty(e.target.value)}
								/>
							</label>
						</div>

						<div className='w-4/12 inline-block'>
							<label>
								<span className='w-3/12 inline-block text-right pr-4'>
									Topics
								</span>
								<input
									type='text'
									className='w-9/12 p-1 border border-black shadow-inside rounded cursor-default'
								/>
							</label>
						</div>
					</div>

					<div className='py-2'>
						<label className='my-2'>
							<span className='w-1/12 inline-block'>Tiers</span>
							<ReactTags
								tags={tiers}
								suggestions={tiersOptions}
								suggestionsTransform={(query, suggestions) => {
									const added = tiers.map((tag) => tag.name)

									const suggested = suggestions.filter((tag) => {
										return added.indexOf(tag.name) == -1
									})

									return matchSorter(suggested, query, { keys: ['name'] })
								}}
								suggestions={tiersOptions}
								onDelete={(i) => {
									const tags = tiers.slice(0)
									tags.splice(i, 1)
									setTiers(tags)
								}}
								onAddition={(tag) => {
									const tags = [].concat(tiers, tag)
									setTiers(tags)
								}}
								classNames={{
									root:
										'relative p-1 border rounded border-black bg-white w-3/12 inline-block align-top',
									selected: 'p-1 inline',
									selectedTag:
										'border rounded border-gray-600 p-1 inline-block bg-white mr-1 mb-1 selected-tag',
									search: 'inline-block px-1 max-w-full',
									searchWrapper: 'react-tags__search-wrapper max-w-full',
									searchInput: 'p-1 border rounded border-gray-600',
									suggestions:
										'p-1 absolute mt-1 bg-white border-black border rounded max-w-fulld',
									suggestionActive: 'bg-blue-400',
								}}
								autoresize={false}
								minQueryLength={0}
							/>

							<span className='w-1/12 inline-block text-right pr-4'>
								Subtopics
							</span>
							<input
								type='text'
								className='w-3/12 p-1 border border-black shadow-inside rounded cursor-default'
							/>
						</label>
					</div>

					<div className='clearfix'>
						<button
							type='button'
							className='bg-blue-600 px-2 py-1 text-white font-bold float-right cursor-pointer rounded'
							onClick={() => {
								fetchQuestions()
							}}
						>
							Search
						</button>
					</div>
				</section>
				<Style>{`
              .selected-tag:after {
                content: '\u2715';
                color: #AAA;
                margin-left: 8px;
              }
          `}</Style>
			</>
		)
	)
}
