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
					{role == 'admin' || role == 'superadmin' ? (
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
				<p>
					by {question.author}
					<br />
					created{' '}
					{moment
						.utc(question.createdAt)
						.utcOffset('+07:00')
						.format('DD MMMM YYYY HH:mm:ss [WIB]')}
					{question.isPublished ? `, published ${question.publishAt}` : ''}
				</p>
				{question.contents === undefined
					? ''
					: [...question.contents].map((q, idx) => (
							<Field
								type={q.type}
								content={q.content}
								key={`q_${idx}`}
								show={true}
								idx={idx + 1}
							/>
					  ))}
			</>
		)
	)
}
