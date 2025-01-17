import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import {
	useAuth,
	fetchPageData,
	diffToBgColor,
	topicToLetter,
} from '../../helpers'
import Error from '../../components/Error'
import Question from '../../components/Question'
import { Style } from 'react-style-tag'

import ChevronUp from '../../icons/ChevronUp'
import ChevronDown from '../../icons/ChevronDown'
import ChevronLeft from '../../icons/ChevronLeft'
import ChevronRight from '../../icons/ChevronRight'
import TagInput from '../../components/TagInput'
import cx from 'classnames'

import { useSelector, useDispatch } from 'react-redux'
import QuestionCard from '../../components/Question/Card'
import question from '../../store/question'

export default function () {
	const history = useHistory()
	const [error, setError] = useState('')
	const dispatch = useDispatch()

	// Redux states
	const questionSet = useSelector((state) => state.questionSet)
	const user_Id = useSelector((state) => state.auth._id)
	const role = useSelector((state) => state.auth.role)

	// Local states & variables
	const [showMeta, setShowMeta] = useState(true)
	const [showSearch, setShowSearch] = useState(true)
	const [viewedQuestion, setViewedQuestion] = useState(null)
	const [questionSetViewerIdx, setQuestionSetViewerIdx] = useState(0)

	const [minDifficulty, setMinDifficulty] = useState(1)
	const [maxDifficulty, setMaxDifficulty] = useState(5)
	const [questionDescription, setQuestionDescription] = useState('')
	const [tiers, setTiers] = useState([])
	const [topics, setTopics] = useState([])
	const [subtopics, setSubtopics] = useState([])
	const [topicOptions, setTopicOptions] = useState([])
	const [subtopicOptions, setSubtopicOptions] = useState([])
	const [searchResult, setSearchResult] = useState([])
	const [addedQuestionsId, setAddedQuestionsId] = useState([])

	const tierOptions = [
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
				// Setting information
				let initTopics = []
				let initSubtopics = []

				res.data.topics.forEach((t) => {
					if (t.type == 'topic') {
						initTopics.push({ id: t._id, name: t.name, type: t.type })
					} else if (t.type == 'subtopic') {
						initSubtopics.push({
							id: t._id,
							name: t.name,
							type: t.type,
						})
					}
				})

				setTopicOptions(initTopics)
				setSubtopicOptions(initSubtopics)
			}
		})

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

	function addQuestion(question) {
		dispatch({
			type: 'questionSet/addQuestion',
			payload: {
				content: {
					id: question.id,
					difficulty: question.difficulty,
					topic: question.topics[0].name,
					maxScore: question.maxScore,
				},
			},
		})
	}

	function removeQuestion(idx) {
		console.log(idx)

		dispatch({
			type: 'questionSet/removeQuestion',
			payload: {
				idx: idx,
			},
		})
	}

	function searchQuestions() {
		let postData = {
			desription: questionDescription,
			minDifficulty: minDifficulty,
			maxDifficulty: maxDifficulty,
			tiers: tiers,
			topics: topics,
			subtopics: subtopics,
		}

		fetch(`${process.env.REACT_APP_API_URL}/question/search`, {
			method: 'POST',
			headers: new Headers({
				'Content-type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			}),
			body: JSON.stringify(postData),
		})
			.then((res) => {
				if (!res.ok) {
					throw new Error('Error creating question')
				}
				return res.json()
			})
			.then((res) => {
				// Load questions
				setSearchResult(res.data)
			})
			.catch((err) => console.error(err))
	}

	function save(e) {
		e.preventDefault()

		// If author not set
		if (questionSet.author === '') {
			alert('Author harus diisi')
			return
		}

		// If description not set
		if (questionSet.description === '') {
			alert('Description harus diisi')
			return
		}

		// If description not set
		if (questionSet.contents.length === 0) {
			alert('Tidak ada soal')
			return
		}

		let postData = {
			createdBy: user_Id,
			author: questionSet.author,
			description: questionSet.description,
			maxScore: questionSet.maxScore,
			isOfficial: questionSet.isOfficial,
			canRandomize: questionSet.canRandomize,
			difficulty: questionSet.difficulty,
			contents: questionSet.contents,
			isPublished: questionSet.isPublished,
		}

		// If QuestionSet is switched to published
		if (questionSet.isPublished) postData.publishedAt = Date.now()

		// Submit form
		fetch(`${process.env.REACT_APP_API_URL}/question_set/create`, {
			method: 'POST',
			headers: new Headers({
				'Content-type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			}),
			body: JSON.stringify(postData),
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
					// Forward to login pageg
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
						onClick={(e) => save(e)}
					>
						Save
					</span>
				</h1>

				<section className='bg-gray-100 rounded px-4 py-2 shadow'>
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
											value={questionSet.canRandomize}
											onChange={(e) =>
												updateMeta({ canRandomize: e.target.value })
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
									value={questionSet.description}
								></textarea>
								<div></div>
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

				{/* Search Questions */}
				<section className='bg-gray-100 rounded px-4 py-2 mt-4 shadow'>
					<h2 className='my-2 font-bold'>Search Questions</h2>
					{showSearch ? (
						<>
							<div className='py-2'>
								<span className='w-1/12 inline-block'>Description</span>
								<input
									type='text'
									className='w-11/12 p-1 border border-black shadow-inside rounded cursor-default'
									value={questionDescription}
									onChange={(e) => setQuestionDescription(e.target.value)}
								></input>
							</div>

							<div className='py-2'>
								<span className='w-1/12 inline-block'>Topics</span>
								<TagInput
									tags={topics}
									setTags={setTopics}
									suggestions={topicOptions}
									minInputLength={1}
									width={'w-11/12'}
								/>
							</div>

							<div className='py-2'>
								<span className='w-1/12 inline-block'>Subtopics</span>
								<TagInput
									tags={subtopics}
									setTags={setSubtopics}
									suggestions={subtopicOptions}
									minInputLength={1}
									width={'w-11/12'}
								/>
							</div>

							<div className='py-2'>
								<span className='w-1/12 inline-block'>Difficulty (1-5)</span>
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
							</div>

							<div className='py-2'>
								<span className='w-1/12 inline-block'>Tiers</span>
								<TagInput
									tags={tiers}
									setTags={setTiers}
									suggestions={tierOptions}
									minInputLength={1}
									width={'w-11/12'}
								/>
							</div>

							<div className='clearfix'>
								<button
									type='button'
									className='bg-blue-600 px-2 py-1 text-white font-bold float-right cursor-pointer rounded'
									onClick={() => {
										searchQuestions()
									}}
								>
									Search
								</button>
							</div>
						</>
					) : (
						<hr className='border-black my-2' />
					)}
					<button
						className='mx-auto block px-2 py-1 border rounded bg-white border-black'
						onClick={(e) => setShowSearch(!showSearch)}
					>
						{showSearch ? (
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

				{/* Search result */}
				<section className='py-4'>
					{searchResult.length > 0 ? (
						<>
							<h2 className='my-2 font-bold block'>Search Result</h2>
							<div className='flex flex-wrap'>
								{searchResult.map((q) => (
									<div className='w-2/12 relative' key={`q_${q.id}`}>
										<QuestionCard
											question={q}
											onClick={() => {
												setViewedQuestion(q.id)
											}}
										/>
										<span
											className='rounded-full px-2 text-white bg-green-600 font-bold absolute top-0 right-0 -mt-2 mr-2 cursor-pointer'
											onClick={() => {
												if (!addedQuestionsId.includes(q.id)) {
													setAddedQuestionsId([...addedQuestionsId, q.id])
													console.log(q)
													addQuestion(q)
												}
											}}
										>
											+
										</span>
									</div>
								))}
							</div>
						</>
					) : (
						''
					)}
				</section>

				{/* Question Numbers */}
				<section className='bg-gray-100 rounded px-4 py-2 mt-4 shadow'>
					<h2 className='my-2 font-bold'>Questions in Set</h2>
					<div className='flex justify-start'>
						{questionSet.contents.length > 0 ? (
							<>
								{questionSet.contents.map((q, idx) => (
									<div
										className={cx(
											`rounded ${diffToBgColor(
												q.difficulty
											)} relative inline-block w-8 h-8 cursor-pointer cursor-pointer mr-2 mb-2`,
											{
												'active-question': questionSetViewerIdx === idx,
											}
										)}
										key={`qn_${idx}`}
									>
										{/* Background color : difficulty, content : topic */}
										<span
											className={'absolute text-white font-bold'}
											style={{
												top: '50%',
												left: '50%',
												transform: 'translate(-50%, -50%)',
											}}
										>
											{topicToLetter(q.topic)}
										</span>
									</div>
								))}
							</>
						) : (
							''
						)}
					</div>
				</section>

				{/* QuestionSet Viewer */}
				<section className='py-2'>
					{questionSet.contents.length > 0 ? (
						<>
							<h2 className='my-2 font-bold pb-2 mb-4 broder-b border-black'>
								QuestionSet Viewer
							</h2>
							<div className='p-8 rounded clearfix border border-black'>
								<div className='float-right'>
									<span className='p-2 mr-2 cursor-pointer bg-gray-100'>
										<ChevronLeft
											className='inline-block'
											onClick={() => {
												if (questionSetViewerIdx > 0) {
													setQuestionSetViewerIdx(questionSetViewerIdx - 1)
												}
											}}
										/>
									</span>
									<span className='p-2 rounded cursor-pointer bg-gray-100'>
										<ChevronRight
											className='inline-block'
											onClick={() => {
												if (
													questionSetViewerIdx <
													addedQuestionsId.length - 1
												) {
													setQuestionSetViewerIdx(questionSetViewerIdx + 1)
												}
											}}
										/>
									</span>
									<button
										className='rounded px-2 py-1 text-white bg-red-600 font-bold cursor-pointer text-sm ml-8'
										onClick={() => {
											let newArr = [...addedQuestionsId]
												.slice(0, questionSetViewerIdx)
												.concat(
													[...addedQuestionsId].slice(questionSetViewerIdx + 1)
												)

											// Delete at the
											if (questionSetViewerIdx == newArr.length) {
												setQuestionSetViewerIdx(newArr.length - 1)
											}

											// No more entries
											if (newArr.length == 0) {
												setQuestionSetViewerIdx(null)
											}

											setAddedQuestionsId(newArr)
											removeQuestion(questionSetViewerIdx)
										}}
									>
										X
									</button>
								</div>
								{questionSetViewerIdx}
								<Question id={addedQuestionsId[questionSetViewerIdx]} />
							</div>
						</>
					) : (
						''
					)}
				</section>
				<Style>{`
              .active-question { border-color: #444 !important; border-width: 4px;}
              .active-question > span { color: black !important; }
            `}</Style>

				{/* Question viewer */}
				{viewedQuestion !== null && (
					<div className='fixed bg-black w-screen h-screen top-0 left-0 p-8 bg-opacity-75 overflow-y-scroll'>
						<div className='mb-4'>
							<h2 className='text-white font-bold inline-block'>
								Question viewer
							</h2>
							<span
								className='font-bold float-right text-white cursor-pointer'
								onClick={() => {
									setViewedQuestion(null)
								}}
							>
								X
							</span>
						</div>
						<div className='rounded px-8 py-4 bg-white opacity-100'>
							<Question id={viewedQuestion} />
						</div>
					</div>
				)}
			</>
		)
	)
}
