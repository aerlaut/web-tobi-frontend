import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { useAuth, fetchPageData } from '../../helpers'
import Error from '../../components/Error'
import Field from '../../components/Question/Field'
import FieldOption from '../../components/Question/FieldOption'

import { useSelector, useDispatch } from 'react-redux'

export default function () {
	const history = useHistory()
	const dispatch = useDispatch()
	const refPassword = useRef('')
	const refConfirmPassword = useRef('')

	// Local state
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')

	// Redux states
	const error = useSelector((state) => state.error)

	const username = useSelector((state) => state.user.username)
	const fullName = useSelector((state) => state.user.fullName)
	const address = useSelector((state) => state.user.address)
	const city = useSelector((state) => state.user.city)
	const province = useSelector((state) => state.user.province)
	const country = useSelector((state) => state.user.country)
	const school = useSelector((state) => state.user.school)
	const mobileNo = useSelector((state) => state.user.mobileNo)
	const email = useSelector((state) => state.user.email)
	const role = useSelector((state) => state.user.role)
	const roles = useSelector((state) => state.user.roles)

	useEffect(() => {
		// Fetch dashboard data
		// fetchPageData((res) => {
		// 	if (res !== 'ok') {
		// 		setError({ type: 'error', message: res.message })
		// 	} else {
		// 		// Setting information
		// 	}
		// })
		// Reset all redux states
		dispatch({
			type: 'user/reset',
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

		// Check if password and confirmed password is the same
		if (password !== confirmPassword) {
			dispatch({
				type: 'error/show',
				payload: {
					message:
						'The passwords you have entered is not the same. Please re-enter your password',
					type: 'danger',
				},
			})

			return
		}

		let postdata = {
			username: username,
			fullName: fullName,
			address: address,
			city: city,
			province: province,
			country: country,
			school: school,
			mobileNo: mobileNo,
			email: email,
			role: role,
			password: password,
		}

		console.log(postdata)

		// Submit form
		fetch(`${process.env.REACT_APP_API_URL}/user/create`, {
			method: 'POST',
			headers: new Headers({
				'Content-type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			}),
			body: JSON.stringify(postdata),
		})
			.then((res) => {
				if (!res.ok) {
					throw new Error('Error creating user')
				}
				return res.json()
			})
			.then((res) => {
				if (res.status !== 'ok') {
					// Error creating user
				} else {
					// Forward to login page
					history.push('/dashboard')
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
				{error.show && <Error type={error.type} message={error.message} />}
				<h1 className='text-xl font-bold mb-4'>
					Buat User Baru
					<span
						className='bg-green-600 px-2 py-1 text-white font-bold float-right cursor-pointer rounded'
						onClick={(e) => save(e)}
					>
						Save
					</span>
				</h1>

				<div className='flex'>
					<div className='w-1/2 flex flex-col'>
						<label className='my-2'>
							<span className='w-2/12 inline-block'>Username</span>
							<input
								type='text'
								className='w-6/12 p-1 border border-black shadow-inside rounded'
								value={username}
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
								value={fullName}
								onChange={(e) =>
									update({ attr: 'fullName', content: e.target.value })
								}
							></input>
						</label>

						<div className='my-2'>
							<span className='w-2/12 inline-block align-top'>Address</span>
							<textarea
								className='rounded border border-black block w-6/12 px-2 py-1 inline-block shadow-inside'
								rows={3}
								onChange={(e) =>
									update({ attr: 'address', content: e.target.value })
								}
								value={address}
							></textarea>
						</div>

						<label className='my-2'>
							<span className='w-2/12 inline-block'>City</span>
							<input
								type='text'
								className='w-6/12 p-1 border border-black shadow-inside rounded'
								value={city}
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
								value={province}
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
								value={country}
								onChange={(e) =>
									update({ attr: 'country', content: e.target.value })
								}
							></input>
						</label>

						<label className='my-2'>
							<span className='w-2/12 inline-block'>School</span>
							<input
								type='text'
								className='w-6/12 p-1 border border-black shadow-inside rounded'
								value={school}
								onChange={(e) =>
									update({ attr: 'school', content: e.target.value })
								}
							></input>
						</label>

						<label className='my-2'>
							<span className='w-2/12 inline-block'>Mobile no.</span>
							<input
								type='text'
								className='w-6/12 p-1 border border-black shadow-inside rounded'
								value={mobileNo}
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
								value={email}
								onChange={(e) =>
									update({ attr: 'email', content: e.target.value })
								}
							/>
						</label>

						<label className='my-2'>
							<span className='w-2/12 inline-block'>Role</span>
							<select
								onChange={(e) =>
									update({ attr: 'role', content: e.target.value })
								}
								value={role}
								className='border rounded p-1 border-black w-6/12'
							>
								{roles.map((r) => (
									<option key={`role_${r.value}`} value={r.value}>
										{r.name}
									</option>
								))}
							</select>
						</label>

						<label className='my-2'>
							<span className='w-2/12 inline-block'>Password</span>
							<input
								type='password'
								className='w-6/12 p-1 border border-black shadow-inside rounded'
								value={password}
								ref={refPassword}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</label>

						<label className='my-2'>
							<span className='w-2/12 inline-block'>Confirm Password</span>
							<input
								type='password'
								className='w-6/12 p-1 border border-black shadow-inside rounded'
								value={confirmPassword}
								ref={refConfirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
							/>
						</label>
					</div>
				</div>
			</>
		)
	)
}
