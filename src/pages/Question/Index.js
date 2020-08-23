import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { auth, fetchPageData } from '../../helpers'
import Error from '../../components/Error'
import NewItem from '../../icons/NewItem'

export default function () {
	const history = useHistory()
	const [error, setError] = useState()
	const [questions, setQuestions] = useState([])

	useEffect(() => {
		// Fetch dashboard data
		fetchPageData({ auth: true }, (res) => {
			if (res.status !== 'ok') {
				setError({ type: 'error', message: res.message })
			} else {
				// Setting information
				setQuestions(res.data)
			}
		})
	}, [])

	return (
		auth(history) && (
			<>
				{error && <Error type={error.type} message={error.message} />}
				<div>Search</div>
				<div>
					<h1 className='text-xl font-bold mb-4'>
						New Questions
						<span className='float-right'>
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
					</h1>
					<div className='flex flex-wrap'>
						{questions.map((el, idx) => (
							<div
								key={`q_${el.questionId}`}
								className='w-2/12 border border-yellow-800 bg-yellow-200 rounded mr-4 mb-4 p-4'
							>
								<h3 className='font-xl font-bold'>{el.questionId}</h3>
								<h3>{el.description}</h3>
								<h3>{el.topics}</h3>
								<h3>{el.tier}</h3>
								<h3>{el.difficulty}</h3>
							</div>
						))}
					</div>
				</div>

				<div>
					<h1 className='text-xl font-bold mb-4'>
						New Sets
						<span className='float-right'>
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
					</h1>
					{questions.map((el) => (
						<div key={`qs_${el.questionId}`}>
							<h3>{el.questionId}</h3>
							<h3>{el.topics}</h3>
							<h3>{el.subtopics}</h3>
						</div>
					))}
				</div>
			</>
		)
	)
}
