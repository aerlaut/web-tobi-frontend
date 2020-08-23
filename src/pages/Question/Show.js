import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

export default function () {
	const history = useHistory()

	// Check for auth
	let auth = function () {
		console.log('auth')
		return false
	}

	useEffect(() => {
		// Fetch dashboard data
		console.log('use effect ran')
	}, [])

	return (
		auth(history) && (
			<>
				<h1 className='text-xl font-bold mb-4'>Dashboard</h1>
				Dashboard
			</>
		)
	)
}
