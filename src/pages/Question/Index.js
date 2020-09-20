import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAuth, fetchPageData } from '../../helpers'
import Error from '../../components/Error'
import NewItem from '../../icons/NewItem'
import QuestionCard from '../../components/Question/Card'
import { useSelector } from 'react-redux'

export default function () {
	const history = useHistory()
	const [error, setError] = useState()
	const [questions, setQuestions] = useState([])
	const [questionSets, setQuestionSets] = useState([])
	const [questionQuery, setQuestionQuery] = useState('')
	const [questionSetQuery, setQuestionSetQuery] = useState('')
	const role = useSelector((state) => state.auth.role)

	useEffect(() => {
		// Fetch dashboard data
		fetchPageData({ auth: true }, (res) => {
			if (res.status !== 'ok') {
				setError({ type: 'error', message: res.message })
			} else {
				// Setting information
				setQuestions(res.data.questions)
				setQuestionSets(res.data.question_sets)
			}
		})
	}, [])

	function searchQuestion() {
		const postData = {
			description: questionQuery,
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
				setQuestions(res.data)
			})
			.catch((err) => console.error(err))
	}

	function searchQuestionSet() {
		const postData = {
			description: questionSetQuery,
		}

		fetch(`${process.env.REACT_APP_API_URL}/question_set/search`, {
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
				console.log(res.data)

				// Load questions
				setQuestionSets(res.data)
			})
			.catch((err) => console.error(err))
	}

	return (
		useAuth() && (
			<>
				{error && <Error type={error.type} message={error.message} />}

				<div className='clearfix'>
					<h1 className='text-xl font-bold mb-4 inline-block'>Questions</h1>
					{role === 'admin' || role === 'superadmin' ? (
						<span className='float-right inline-block font-bold'>
							<Link
								to='/question/create'
								className='mr-4 px-4 py-2 bg-blue-600 rounded inline-block text-white text-sm'
							>
								<NewItem
									color='white'
									className='mr-2 inline-block align-text-top'
									size={16}
								/>
								Create
							</Link>
						</span>
					) : (
						''
					)}
					<div className='mb-4'>
						<input
							type='text'
							className='shadow-inner px-2 py-1 rounded w-4/12 border'
							value={questionQuery}
							onChange={(e) => setQuestionQuery(e.target.value)}
							placeholder='Search'
						></input>
						<button
							className='px-2 py-1 bg-blue-600 font-bold text-white ml-2 rounded'
							onClick={searchQuestion}
						>
							Search
						</button>
					</div>
					<div className='flex overflow-x-scroll border rounded shadow-inner'>
						{questions.length === 0 ? (
							<p className='py-2 text-center w-full'>
								Tidak ada data, coba search term lainnya
							</p>
						) : (
							<>
								{questions.map((q, idx) => (
									// <>{q.id}, </>
									<QuestionCard
										question={q}
										key={`q_${q.id}`}
										onClick={() => {
											history.push(`/question/${q.id}`)
										}}
									/>
								))}
							</>
						)}
					</div>
				</div>

				<div class='mt-8'>
					<h1 className='text-xl font-bold mb-4 inline-block'>Question Sets</h1>
					{role === 'admin' || role === 'superadmin' ? (
						<span className='float-right inline-block font-bold'>
							<Link
								to='/question_set/create'
								className='mr-4 px-4 py-2 bg-blue-600 rounded inline-block text-white text-sm'
							>
								<NewItem
									color='white'
									className='mr-2 inline-block align-text-top'
									size={16}
								/>
								Create
							</Link>
						</span>
					) : (
						''
					)}

					<div className='mb-4'>
						<input
							type='text'
							className='shadow-inner px-2 py-1 rounded w-4/12 border'
							value={questionSetQuery}
							onChange={(e) => setQuestionSetQuery(e.target.value)}
							placeholder='Search'
						></input>
						<button
							className='px-2 py-1 bg-blue-600 font-bold text-white ml-2 rounded'
							onClick={searchQuestionSet}
						>
							Search
						</button>
					</div>
					<div className='flex overflow-x-scroll border rounded shadow-inner'>
						{questionSets.length === 0 ? (
							<p className='py-2 text-center w-full'>
								Tidak ada data, coba search term lainnya
							</p>
						) : (
							<>
								{questionSets.map((qs, idx) => (
									<QuestionCard
										question={qs}
										key={`qs_${qs.id}`}
										onClick={() => {
											history.push(`/question_set/${qs.id}`)
										}}
									/>
								))}
							</>
						)}
					</div>

					{/* Show question set here */}
				</div>
			</>
		)
	)
}
