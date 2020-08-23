import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { auth, fetchPageData } from '../../helpers'
import Field from '../../components/Question/Field'
import moment from 'moment'

export default function () {
	const history = useHistory()
	const [error, setError] = useState()
	const [question, setQuestion] = useState({})

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
		auth(history) && (
			<>
				<h1 className='text-xl font-bold mb-4'>Soal ID : {id}</h1>
				<p>
					by {question.author}
					<br />
					created{' '}
					{moment.utc(question.createdAt).format('DD MMMM YYYY HH:mm:ss')}
					{question.isPublished ? `, published ${question.publishDate}` : ''}
				</p>
				{question.body === undefined
					? ''
					: [...question.body].map((q, idx) => (
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
