import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useAuth, fetchPageData } from '../../helpers'
import Error from '../../components/Error'
import moment from 'moment'

import { useSelector, useDispatch } from 'react-redux'

export default function () {
	const history = useHistory()
	const dispatch = useDispatch()

	let { id } = useParams()

	// Redux states
	const user = useSelector((state) => state.user)
	const auth = useSelector((state) => state.auth)

	// Local state
	const [error, setError] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')

	useEffect(() => {
		// Fetch dashboard data
		fetchPageData({ auth: true }, (res) => {
			if (res.status !== 'ok') {
				setError({ type: 'error', message: res.message })
			} else {
				// Push question to redux
				dispatch({
					type: 'user/load',
					payload: {
						data: res.data,
					},
				})
			}
		})
	}, [])

	function update(payload) {
		dispatch({
			type: 'user/update',
			payload: payload,
		})
	}

	function save(e) {
		e.preventDefault()

		let postdata = {
			_id: user._id,
			updatedAt: Date.now(),
			username: user.username,
			fullname: user.fullname,
			address: user.address,
			city: user.city,
			province: user.province,
			country: user.country,
			school: user.school,
			grade: user.grade,
			mobileNo: user.mobileNo,
			email: user.email,
			role: user.role,
			emailVerified: user.emailVerified,
		}

		// Check if password is set
		if (password !== '') {
			if (password === confirmPassword) {
				postdata.password = password
			} else {
				dispatch({
					type: 'error/show',
					payload: {
						type: 'danger',
						message:
							'The passwords you entered does not match. Please re-enter the password.',
					},
				})
				return
			}
		}

		// Submit form
		fetch(`${process.env.REACT_APP_API_URL}/user/${id}/edit`, {
			method: 'POST',
			headers: new Headers({
				'Content-type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			}),
			body: JSON.stringify(postdata),
		})
			.then((res) => {
				if (!res.ok) {
					throw new Error('Error creating question')
				}
				return res.json()
			})
			.then((res) => {
				if (res.status !== 'ok') {
					// Error creating question
				} else {
					// Forward to login page
					history.push(`/user/${id}`)
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
				{error && <Error type={error.type} message={error.message} />}
				<h1 className='text-xl font-bold mb-4'>
					<span
						className='bg-green-600 px-2 py-1 text-white font-bold float-right cursor-pointer rounded text-base'
						onClick={(e) => save(e)}
					>
						Update
					</span>
				</h1>

				<div className='flex'>
					<div className='w-1/2 flex flex-col'>
						<label className='my-2'>
							<span className='w-2/12 inline-block'>Username</span>
							<input
								type='text'
								className='w-6/12 p-1 border border-black shadow-inside rounded bg-gray-200 cursor-not-allowed'
								value={user.username}
								readOnly={true}
								onChange={(e) =>
									update({ attr: 'username', content: e.target.value })
								}
							></input>
						</label>

						<label className='my-2'>
							<span className='w-2/12 inline-block'>Full name</span>
							<input
								type='text'
								className='w-6/12 p-1 border border-black shadow-inside rounded'
								value={user.fullname}
								onChange={(e) =>
									update({ attr: 'fullname', content: e.target.value })
								}
							></input>
						</label>

						<div className='my-2'>
							<span className='w-2/12 inline-block align-top'>Address</span>
							<textarea
								className='rounded border border-black block w-6/12 px-2 py-1 inline-block'
								rows={3}
								value={user.address}
								onChange={(e) => {
									update({ attr: 'address', content: e.target.value })
								}}
							></textarea>
							<div></div>
						</div>

						<label className='my-2'>
							<span className='w-2/12 inline-block'>City</span>
							<input
								type='text'
								className='w-6/12 p-1 border border-black shadow-inside rounded'
								value={user.city}
								onChange={(e) =>
									update({ attr: 'city', content: e.target.value })
								}
							></input>
						</label>

						<label className='my-2'>
							<span className='w-2/12 inline-block'>Province</span>
							<input
								type='text'
								className='w-6/12 p-1 border border-black shadow-inside rounded'
								value={user.province}
								onChange={(e) =>
									update({ attr: 'province', content: e.target.value })
								}
							></input>
						</label>

						<label className='my-2'>
							<span className='w-2/12 inline-block'>Country</span>
							<input
								type='text'
								className='w-6/12 p-1 border border-black shadow-inside rounded'
								value={user.country}
								onChange={(e) =>
									update({ attr: 'country', content: e.target.value })
								}
							></input>
						</label>

						<label className='my-2'>
							<span className='w-2/12 inline-block'>School Name</span>
							<input
								type='text'
								className='w-6/12 p-1 border border-black shadow-inside rounded'
								value={user.school}
								onChange={(e) =>
									update({ attr: 'school', content: e.target.value })
								}
							></input>
						</label>

						<label className='my-2'>
							<span className='w-2/12 inline-block'>Grade</span>
							<input
								type='text'
								className='w-6/12 p-1 border border-black shadow-inside rounded'
								value={user.grade}
								onChange={(e) =>
									update({ attr: 'grade', content: e.target.value })
								}
							></input>
						</label>

						<label className='my-2'>
							<span className='w-2/12 inline-block'>Mobile No.</span>
							<input
								type='text'
								className='w-6/12 p-1 border border-black shadow-inside rounded'
								value={user.mobileNo}
								onChange={(e) =>
									update({ attr: 'mobileNo', content: e.target.value })
								}
							></input>
						</label>

						<label className='my-2'>
							<span className='w-2/12 inline-block'>Email</span>
							<input
								type='text'
								className='w-6/12 p-1 border border-black shadow-inside rounded'
								value={user.email}
								onChange={(e) =>
									update({ attr: 'email', content: e.target.value })
								}
							></input>
						</label>

						<label className='my-2'>
							<span className='w-2/12 inline-block'>Role</span>
							<select
								onChange={(e) =>
									update({ attr: 'role', content: e.target.value })
								}
								value={user.role}
								className='border rounded p-1 border-black w-6/12'
							>
								{user.roles.map((t) => (
									<option key={`role_${t.value}`} value={t.value}>
										{t.name}
									</option>
								))}
							</select>
						</label>

						<label>
							<span className='w-2/12 inline-block'>Email Verified</span>
							<select
								onChange={(e) =>
									update({ attr: 'emailVerified', content: e.target.value })
								}
								value={user.emailVerified}
								className='border rounded p-1 border-black w-6/12'
							>
								<option value={false}>Not Verified</option>
								<option value={true}>Verified</option>
							</select>
						</label>

						<p className='mt-4 mb-2'>
							Kosongkan password jika tidak ingin diubah
						</p>

						<label className='my-2'>
							<span className='w-2/12 inline-block'>Password</span>
							<input
								type='password'
								className='w-6/12 p-1 border border-black shadow-inside rounded'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</label>

						<label className='my-2'>
							<span className='w-2/12 inline-block'>Confirm Password</span>
							<input
								type='password'
								className='w-6/12 p-1 border border-black shadow-inside rounded'
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
							/>
						</label>
					</div>
				</div>
			</>
		)
	)
}
