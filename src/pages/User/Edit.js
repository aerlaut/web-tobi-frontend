import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useAuth, fetchPageData } from '../../helpers'
import Error from '../../components/Error'
import moment from 'moment'

import { useSelector, useDispatch } from 'react-redux'

export default function () {
	const history = useHistory()
	const dispatch = useDispatch()
	const { id } = useParams()

	// Local state
	const [error, setError] = useState('')
	const [password, setPassword] = useState('')

	// Redux states
	const objectId = useSelector((state) => state.user._Id)
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
	const isVerified = useSelector((state) => state.user.isVerified)
	const emailVerified = useSelector((state) => state.user.emailVerified)

	useEffect(() => {
		// Fetch dashboard data
		fetchPageData({ auth: true }, (res) => {
			if (res.status !== 'ok') {
				setError({ type: 'error', message: res.message })
			} else {
				// Get some status for updating

				// Push question to redux
				dispatch({
					type: 'question/load',
					payload: {
						data: res.data,
					},
				})
			}
		})
	}, [])

	function save(e) {
		e.preventDefault()

		let postdata = {
			_id: objectId,
			updatedAt: Date.now(),
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
		}

		// Submit form
		fetch(`${process.env.REACT_APP_API_URL}/question/${id}/edit`, {
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
								className='w-6/12 p-1 border border-black shadow-inside rounded'
								value={username}
								onChange={(e) => {
									dispatch({
										type: 'question/setAuthor',
										payload: { content: e.target.value },
									})
								}}
							></input>
						</label>

						<label className='my-2'>
							<span className='w-2/12 inline-block'>Full name</span>
							<input
								type='text'
								className='w-6/12 p-1 border border-black shadow-inside rounded'
								value={fullName}
								onChange={(e) => {
									dispatch({
										type: 'question/setFullName',
										payload: { content: e.target.value },
									})
								}}
							></input>
						</label>

						<div className='my-2'>
							<strong>Address</strong>
							<textarea
								className='rounded border border-black block w-full px-2 py-1'
								rows={3}
								value={address}
								onChange={(e) => {
									dispatch({
										type: 'question/setAddress',
										payload: { content: e.target.value },
									})
								}}
							></textarea>
							<div></div>
						</div>

						<label className='my-2'>
							<span className='w-2/12 inline-block'>City</span>
							<input
								type='text'
								className='w-6/12 p-1 border border-black shadow-inside rounded'
								value={city}
								onChange={(e) => {
									dispatch({
										type: 'question/setFullName',
										payload: { content: e.target.value },
									})
								}}
							></input>
						</label>

						<label className='my-2'>
							<span className='w-2/12 inline-block'>Province</span>
							<input
								type='text'
								className='w-6/12 p-1 border border-black shadow-inside rounded'
								value={province}
								onChange={(e) => {
									dispatch({
										type: 'question/setFullName',
										payload: { content: e.target.value },
									})
								}}
							></input>
						</label>

						<label className='my-2'>
							<span className='w-2/12 inline-block'>Country</span>
							<input
								type='text'
								className='w-6/12 p-1 border border-black shadow-inside rounded'
								value={country}
								onChange={(e) => {
									dispatch({
										type: 'question/setFullName',
										payload: { content: e.target.value },
									})
								}}
							></input>
						</label>

						<label className='my-2'>
							<span className='w-2/12 inline-block'>School Name</span>
							<input
								type='text'
								className='w-6/12 p-1 border border-black shadow-inside rounded'
								value={school}
								onChange={(e) => {
									dispatch({
										type: 'question/setFullName',
										payload: { content: e.target.value },
									})
								}}
							></input>
						</label>
					</div>
					<div className='w-1/2 flex flex-col'>
						<label className='my-2'>
							<span className='w-2/12 inline-block'>Mobile No.</span>
							<input
								type='text'
								className='w-6/12 p-1 border border-black shadow-inside rounded'
								value={mobileNo}
								onChange={(e) => {
									dispatch({
										type: 'question/setMobileNo',
										payload: { content: e.target.value },
									})
								}}
							></input>
						</label>

						<label className='my-2'>
							<span className='w-2/12 inline-block'>Email</span>
							<input
								type='text'
								className='w-6/12 p-1 border border-black shadow-inside rounded'
								value={email}
								onChange={(e) => {
									dispatch({
										type: 'question/setEmail',
										payload: { content: e.target.value },
									})
								}}
							></input>
						</label>

						<label className='my-2'>
							<span className='w-2/12 inline-block'>Role</span>
							<select
								onChange={(e) =>
									dispatch({
										type: 'question/setRole',
										payload: { content: e.target.value },
									})
								}
								value={role}
								className='border rounded p-1 border-black w-2/12'
							>
								{roles.map((t) => (
									<option key={`role_${t.value}`} value={t.value}>
										{t.name}
									</option>
								))}
							</select>
						</label>
					</div>
				</div>
			</>
		)
	)
}
