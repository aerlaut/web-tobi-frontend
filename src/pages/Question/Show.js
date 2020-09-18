import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useAuth, fetchPageData } from '../../helpers'
import Field from '../../components/Question/Field'
import moment from 'moment'
import { useSelector } from 'react-redux'

export default function () {
	const history = useHistory()
	const [error, setError] = useState()
	const [question, setQuestion] = useState({})

	const role = useSelector((state) => state.auth.role)

	useEffect(() => {
		// Fetch dashboard data
		fetchPageData({ auth: true }, (res) => {
			if (res.status !== 'ok') {
				setError({ type: 'error', message: res.message })
			} else {
				// Setting information
				setQuestion(res.data)
			}
		})
	}, [])

	let { id } = useParams()

	return (
		useAuth() && (
			<>
				<h1 className='text-xl font-bold mb-4'>
					Soal ID : {id}
					{role === 'admin' || role === 'superadmin' ? (
						<span
							className='bg-blue-600 px-2 py-1 text-white font-bold float-right cursor-pointer text-base rounded'
							onClick={() => history.push(`/question/${id}/edit`)}
						>
							Edit
						</span>
					) : (
						''
					)}
				</h1>
				<div className='clearfix mb-4'>
					Created{' '}
					{moment
						.utc(question.createdAt)
						.utcOffset('+07:00')
						.format('DD MMMM YYYY HH:mm:ss [WIB]')}
					<br />
					by <span className='italic'>{question.author}</span>
					<br />
					{question.isPublished
						? `Published ${moment
								.utc(question.publishedAt)
								.utcOffset('+07:00')
								.format('DD MMMM YYYY HH:mm:ss [WIB]')}`
						: ''}
					<br />
				</div>

				<section>
					<div class='py-2'>
						Difficulty: <span>{question.difficulty}</span>
					</div>
					<div class='py-2'>
						Topics :
						{question.topics &&
							question.topics.map((el, idx) => (
								<span className='px-1 py-1 text-sm rounded bg-yellow-300 ml-2'>
									{el.name}
								</span>
							))}
					</div>
					<div class='py-2'>
						Subtopics :
						{question.subtopics &&
							question.subtopics.map((el, idx) => (
								<span className='px-1 py-1 text-sm rounded bg-yellow-300 ml-2'>
									{el.name}
								</span>
							))}
					</div>
				</section>

				<section className='my-4'>
					<h2 className='mb-4 font-bold'>Deskripsi</h2>
					<p>{question.description}</p>
				</section>

				<section className='my-4'>
					<h2 className='mb-4 font-bold'>Soal</h2>
					{question.contents === undefined
						? ''
						: [...question.contents].map((q, idx) => (
								<Field
									type={q.type}
									content={q.content}
									key={`q_${idx}`}
									mode='view'
									idx={idx + 1}
								/>
						  ))}
				</section>
			</>
		)
	)
}
