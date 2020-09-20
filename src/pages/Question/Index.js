import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAuth, fetchPageData } from '../../helpers'
import Error from '../../components/Error'
import NewItem from '../../icons/NewItem'
import QuestionCard from '../../components/Question/Card'
import { useSelector } from 'react-redux'
import { queryByDisplayValue } from '@testing-library/react'

export default function () {
	const history = useHistory()
	const [error, setError] = useState()
	const [questions, setQuestions] = useState([])
	const [questionSets, setQuestionSets] = useState([])
	const role = useSelector((state) => state.auth.role)

	useEffect(() => {
		// Fetch dashboard data
		fetchPageData({ auth: true }, (res) => {
			if (res.status !== 'ok') {
				setError({ type: 'error', message: res.message })
			} else {
				console.log(res.data)
				// Setting information
				setQuestions(res.data.questions)
				setQuestionSets(res.data.question_sets)
			}
		})
	}, [])

	return (
		useAuth() && (
			<>
				{error && <Error type={error.type} message={error.message} />}

				<div className='clearfix'>
					<h1 className='text-xl font-bold mb-4 inline-block'>New Questions</h1>
					{role === 'admin' || role === 'superadmin' ? (
						<span className='float-right inline-block'>
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
					<div className='mb-4'>Search</div>
					<div className='flex flex-wrap'>
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
					</div>
				</div>

				<div>
					<h1 className='text-xl font-bold mb-4 pt-8 inline-block'>New Sets</h1>
					{role === 'admin' || role === 'superadmin' ? (
						<span className='float-right inline-block'>
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

					<div className='mb-4'>Search</div>
					<div className='flex flex-wrap'>
						{questionSets.map((qs, idx) => (
							<QuestionCard
								question={qs}
								key={`qs_${qs.id}`}
								onClick={() => {
									history.push(`/question_set/${qs.id}`)
								}}
							/>
						))}
					</div>

					{/* Show question set here */}
				</div>
			</>
		)
	)
}
