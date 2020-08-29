import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useAuth, fetchPageData } from '../../helpers'
import { useSelector, useDispatch } from 'react-redux'

export default function () {
	const history = useHistory()
	const [display, setDisplay] = useState({})
	const dispatch = useDispatch()

	const role = useSelector((state) => state.auth.role)

	useEffect(() => {
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
	}, [])

	let { id } = useParams()

	return (
		useAuth() && (
			<>
				<div className='clearfix'>
					<h1 className='text-xl font-bold mb-4 inline-block'>
						{display.username}
					</h1>

					{role === 'admin' || role === 'superadmin' ? (
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
					<p class='font-bold'>{display.fullame}</p>
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
						<span class='capitalize'>{display.country}</span>
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
