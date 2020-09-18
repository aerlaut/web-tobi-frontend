import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAuth, fetchPageData } from '../../helpers'
import Error from '../../components/Error'
import NewItem from '../../icons/NewItem'
import { useSelector } from 'react-redux'

export default function () {
	const history = useHistory()
	const [error, setError] = useState()
	const [questions, setQuestions] = useState([])
	const role = useSelector((state) => state.auth.role)

	useEffect(() => {
		// Fetch dashboard data
		fetchPageData({ auth: true }, (res) => {
			if (res.status !== 'ok') {
				setError({ type: 'error', message: res.message })
			} else {
				console.log(res.data)

				// Setting information
				setQuestions(res.data)
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
						{questions.map((el, idx) => (
							<div
								key={`q_${el.id}`}
								className='w-2/12 border border-gray-800 bg-gray-100 rounded mr-4 mb-4 p-4 cursor-pointer shadow flex flex-col justify-end'
								onClick={() => history.push(`/question/${el.id}`)}
							>
								<div className='flex-1'>
									<h3 className='font-xl font-bold mb-2'>
										<span>#{el.id}</span>
										<span className='px-1 py-1 text-sm rounded bg-yellow-500 ml-2'>
											{el.tier}
										</span>
										<span className='float-right'>{el.difficulty}</span>
									</h3>
									<p className='mt-2 mb-4'>{el.description}</p>
								</div>
								<div>
									<span>
										{el.topics.map((t, idx) => (
											<span
												key={`q_${el.id}_t_${idx}`}
												className='px-1 py-1 text-sm rounded bg-yellow-300 mr-2'
											>
												{t.name}
											</span>
										))}
									</span>
								</div>
								<div className='mt-2'>
									<span>
										{el.subtopics.map((t, idx) => (
											<span
												key={`q_${el.id}_st_${idx}`}
												className='px-1 py-1 text-sm rounded bg-yellow-500 mr-2'
											>
												{t.name}
											</span>
										))}
									</span>
								</div>
							</div>
						))}
					</div>
				</div>

				<div>
					<h1 className='text-xl font-bold mb-4'>New Sets</h1>
					{role === 'admin' || role === 'superadmin' ? (
						<span className='float-right'>
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

					{/* Show question set here */}
				</div>
			</>
		)
	)
}
