import React, { useState, useEffect } from 'react'
import TagInput from '../components/TagInput'
import { fetchPageData, useAuth } from '../helpers'

export default function () {
	const [topics, setTopics] = useState([])
	const [subtopics, setSubtopics] = useState([])
	const [error, setError] = useState(null)

	useEffect(() => {
		// Fetch dashboard data
		fetchPageData({ auth: true }, (res) => {
			if (res.status !== 'ok') {
				setError({ type: 'error', message: res.message })
			} else {
				// Setting information
				setTopics(res.data.topics)
				setSubtopics(res.data.subtopics)
			}
		})
	}, [])

	return (
		useAuth() && (
			<>
				<button className='bg-blue-600 text-white font-bold float-right px-2 py-1 rounded'>
					Save
				</button>

				<div className='mb-4 mt-2'>
					<h1 className='mb-1 font-bold'>Manage topics</h1>
					<TagInput tags={topics} setTags={setTopics} allowNew={true} />
				</div>

				<div>
					<h1 className='mb-1 font-bold'>Manage subtopics</h1>
					<TagInput tags={subtopics} setTags={setSubtopics} allowNew={true} />
				</div>
			</>
		)
	)
}
