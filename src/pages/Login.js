import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import cx from 'classnames'
import { useDispatch } from 'react-redux'

export default function () {
	const history = useHistory()
	const dispatch = useDispatch()

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [formStatus, setFormStatus] = useState('')

	const handleSubmit = (e) => {
		e.preventDefault()

		// Submit form
		fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify({
				username: username,
				password: password,
			}),
		})
			.then((res) => {
				if (!res.ok) {
					throw new Error('Error logging in')
				}
				return res.json()
			})
			.then((res) => {
				if (res.status !== 'ok') {
					setFormStatus({ type: 'error', message: res.message })
				} else {
					// Save token
					localStorage.setItem('token', res.data.token)
					localStorage.setItem('username', res.data.username)
					localStorage.setItem('role', res.data.role)

					// Push data to redux
					dispatch({
						type: 'auth/logUserIn',
						payload: {
							username: res.data.username,
							role: res.data.role,
						},
					})

					// Forward to login page
					history.push('/dashboard')
				}
			})
			.catch((err) => {
				// Show error details
				console.error(err)
				setFormStatus({ type: 'error', message: 'Connnection error' })
			})
	}

	return (
		<>
			<h1 className='text-xl font-bold mb-4'>Login</h1>

			<form className='flex flex-col' onSubmit={handleSubmit}>
				<label className='my-2'>
					<span className='w-1/12 inline-block mr-4'>Username</span>
					<input
						type='text'
						className='w-2/12 p-1 border border-black shadow-inside rounded'
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						name='username'
					></input>
				</label>

				<label className='my-2'>
					<span className='w-1/12 inline-block mr-4'>Password</span>
					<input
						type='password'
						className='w-2/12 p-1 border border-black shadow-inside rounded'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						name='password'
					></input>
				</label>

				{formStatus === '' ? null : (
					<p
						className={cx('text-white rounded py-2 px-4', {
							'bg-red-800': formStatus.type === 'error',
							'bg-green-600': formStatus.type === 'success',
						})}
					>
						{formStatus.statusText}
					</p>
				)}

				<button className='mt-4 py-2 px-4 text-white bg-blue-600 rounded font-bold'>
					Login
				</button>
			</form>
		</>
	)
}
