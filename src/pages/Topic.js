import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import TagInput from '../components/TagInput'
import { fetchPageData, useAuth } from '../helpers'

export default function () {
	const [topics, setTopics] = useState([])
	const [subtopics, setSubtopics] = useState([])
	const [error, setError] = useState(null)
	const history = useHistory()

	useEffect(() => {
		// Fetch dashboard data
		fetchPageData({ auth: true }, (res) => {
			if (res.status !== 'ok') {
				setError({ type: 'error', message: res.message })
			} else {
				// Setting information

				let initTopics = []
				let initSubtopics = []

				res.data.forEach((topic) => {
					if (topic.type == 'topic') {
						initTopics.push({ id: topic._id, name: topic.name })
					} else if (topic.type == 'subtopic') {
						initSubtopics.push({ id: topic._id, name: topic.name })
					}
				})

				setTopics(initTopics)
				setSubtopics(initSubtopics)
			}
		})
	}, [])

	function save() {
		let postdata = {
			topics: topics,
			subtopics: subtopics,
		}

		// Submit form
		fetch(`${process.env.REACT_APP_API_URL}/topic`, {
			method: 'POST',
			headers: new Headers({
				'Content-type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			}),
			body: JSON.stringify(postdata),
		})
			.then((res) => {
				if (!res.ok) {
					throw new Error('Error creating topics')
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

	return (
		useAuth() && (
			<>
				<button
					onClick={save}
					className='bg-blue-600 text-white font-bold float-right px-2 py-1 rounded'
				>
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
