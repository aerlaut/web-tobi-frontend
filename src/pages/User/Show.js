import React, { useEffect, useState } from 'react'
import { useHistory, useParams, useRouteMatch } from 'react-router-dom'
import { useAuth, fetchPageData } from '../../helpers'
import { useSelector, useDispatch } from 'react-redux'

export default function () {
	const [display, setDisplay] = useState({})
	const history = useHistory()
	const dispatch = useDispatch()
	const match = useRouteMatch('/user/profile')

	const role = useSelector((state) => state.auth.role)
	let { id } = useParams()

	useEffect(() => {
		// if user/id
		if (!match) {
			// Push to /user/profile if not admin
			if (!(role == 'superadmin' || role == 'admin')) {
				history.push('/user/profile')
				return
			}

			// Fetch dashboard data
			fetchPageData({ auth: true }, (res) => {
				if (res.status !== 'ok') {
					dispatch({
						type: 'error/show',
						payload: {
							type: 'danger',
							message: res.message,
						},
					})
				} else {
					// Setting information
					setDisplay(res.data)
				}
			})
		} else {
			// Change to auth id
			id = localStorage.getItem('uid')

			// Fetch dashboard data
			fetch(`${process.env.REACT_APP_API_URL}/user/profile`, {
				method: 'POST',
				headers: new Headers({
					'Content-type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				}),
				body: JSON.stringify({ id: localStorage.getItem('uid') }),
			})
				.then((res) => res.json())
				.then((res) => {
					if (res.status !== 'ok') {
						dispatch({
							type: 'error/show',
							payload: {
								type: 'danger',
								message: res.message,
							},
						})
					} else {
						// Setting information
						setDisplay(res.data)
					}
				})
		}
	}, [match])

	return (
		useAuth() && (
			<>
				<div className='clearfix'>
					<h1 className='text-xl font-bold mb-4 inline-block'>
						{display.username}
					</h1>

					{role === 'admin' || role === 'superadmin' || match ? (
						<span
							className='bg-blue-600 px-2 py-1 text-white float-right cursor-pointer rounded inline-block'
							onClick={() => history.push(`/user/${id}/edit`)}
						>
							Edit
						</span>
					) : (
						''
					)}
				</div>

				<div className='mb-4'>
					<p className='font-bold'>{display.fullame}</p>
					<p>{display.grade}</p>
					<p>{display.school}</p>
				</div>

				<div className='my-4'>
					<h2 className='mb-4 font-bold'>Kontak</h2>
					<p>{display.email}</p>
					<p>{display.mobileNo}</p>
				</div>

				<div className='my-4'>
					<h2 className='mb-4 font-bold'>Alamat</h2>
					<p>
						{display.address}, <br />
						{display.city}, {display.province}
						<br />
						<span className='capitalize'>{display.country}</span>
					</p>
				</div>

				{display.role == 'admin' || display.role == 'superadmin' ? (
					<div className='my-4'>
						<h2 className='mb-4 font-bold'>Status</h2>
						<p>{display.emailVerified}</p>
						<p>{display.isVerified}</p>
						<p>{display.lastLogin}</p>
					</div>
				) : (
					''
				)}
			</>
		)
	)
}
