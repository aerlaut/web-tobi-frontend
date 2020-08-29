import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useAuth, fetchPageData } from '../../helpers'
import Field from '../../components/Question/Field'
import moment from 'moment'
import { useSelector } from 'react-redux'

export default function () {
	const history = useHistory()
	const [error, setError] = useState()
	const [user, setUser] = useState({})

	const role = useSelector((state) => state.auth.role)

	useEffect(() => {
		// Fetch dashboard data
		fetchPageData({ auth: true }, (res) => {
			if (res.status !== 'ok') {
				setError({ type: 'error', message: res.message })
			} else {
				// Setting information
				setUser(res.data)
			}
		})
	}, [])

	let { id } = useParams()

	return (
		useAuth() && (
			<>
				<h1 className='text-xl font-bold mb-4'>
					{user.username}
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

				<div className='my-4'>
					<p class='font-bold'>{user.fullName}</p>
				</div>

				<div className='my-4'>
					<h2 className='mb-4 font-bold'>Kontak</h2>
					<p>{user.email}</p>
					<p>{user.mobileNo}</p>
				</div>

				<div className='my-4'>
					<h2 className='mb-4 font-bold'>Alamat</h2>
					<p>
						{user.address}, <br />
						{user.city}, {user.province}
						<br />
						<span class='capitalize'>{user.country}</span>
					</p>
				</div>

				<div className='my-4'>
					<h2 className='mb-4 font-bold'>Status</h2>
					<p>{user.emailVerified}</p>
					<p>{user.isVerified}</p>
					<p>{user.lastLogin}</p>
				</div>
			</>
		)
	)
}
