import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useAuth, fetchPageData } from '../helpers'
import Error from '../components/Error'
import { useDispatch, useSelector } from 'react-redux'

export default function () {
	const dispatch = useDispatch()
	const error = useSelector((state) => state.error)

	useEffect(() => {
		// Fetch dashboard data
		fetchPageData((res) => {
			if (res !== 'ok') {
				dispatch({
					type: 'error/show',
					content: {
						type: 'danger',
						message: 'Error fetching data',
					},
				})
			} else {
				// Setting information
			}
		})
	}, [])

	return (
		useAuth() && (
			<>
				{error.show && <Error type={error.type} message={error.message} />}
				<h1 className='text-xl font-bold mb-4'>Dashboard</h1>
			</>
		)
	)
}
