import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import ChevronDown from '../icons/ChevronDown'
import cx from 'classnames'

export default function AppBar() {
	const history = useHistory()

	const [showLogin, setShowLogin] = useState(false)
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [formStatus, setFormStatus] = useState('')
	const [showUserDropdown, setShowUserDropdown] = useState(false)

	function handleLogin(e) {
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
					localStorage.setItem('username', res.data.user.username)

					// Forward to login page
					history.push('/dashboard')
					showLogin(false)
				}
			})
			.catch((err) => {
				// Show error details
				console.error(err)
				setFormStatus({ type: 'error', message: 'Connnection error' })
			})
	}

	// Handles log out
	function handleLogout() {
		// Delete local storage
		localStorage.removeItem('username')
		localStorage.removeItem('token')

		// Return to home screen
		history.push('')

		setShowUserDropdown(false)
	}

	return (
		<>
			<nav className='p-4 border-gray-400 bg-gray-200 border-b-2 shadow clearfix'>
				<Link to='/' className='float-left'>
					<img className='logo' /> Logo
				</Link>

				{/* Left links */}
				<ul className='flex float-left'>
					{localStorage.getItem('username') !== undefined ? (
						// Logged in
						<>
							<li className='mr-4 inline-block'>
								<Link className='py-2 px-4' to='/question'>
									Soal
								</Link>
							</li>
						</>
					) : (
						// Logged out
						<>
							<li className='mr-4 inline-block'>
								<Link className='py-2 px-4' to='/about'>
									About
								</Link>
							</li>
						</>
					)}

					<li></li>
				</ul>
				{/* Right links */}
				<ul className='float-right flex'>
					{localStorage.getItem('username') !== null ? (
						// Logged in
						<>
							<li class='relative'>
								<span
									className='inline-block cursor-pointer hover:bg-gray-300 rounded px-2 py-1'
									onClick={() => setShowUserDropdown(!showUserDropdown)}
								>
									{localStorage.getItem('username')}
									<ChevronDown className='inline-block' />
								</span>

								{showUserDropdown ? (
									<ul
										className='bg-white rounded right-0 absolute border border-black w-32'
										style={{ top: '2em' }}
									>
										<Link to='/user/profile'>
											<li className='px-4 py-2'>Profile</li>
										</Link>
										<li
											className='border-t border-gray-800 px-4 py-2 cursor-pointer'
											onClick={() => handleLogout()}
										>
											Log Out
										</li>
									</ul>
								) : (
									''
								)}
							</li>
						</>
					) : (
						// Logged out
						<>
							<li className='inline-block'>
								<Link className='py-2 px-4' to='/register'>
									Register
								</Link>
							</li>
							<li>
								<a
									className='py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded cursor-pointer'
									onClick={() => setShowLogin(!showLogin)}
								>
									Login
								</a>
							</li>
						</>
					)}
				</ul>
			</nav>
			<div
				className={
					showLogin ? 'fixed w-screen h-screen fixed top-0 left-0' : 'hidden'
				}
				style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
			>
				<div className='w-100 my-8 flex justify-center'>
					<form
						id='login'
						className='py-4 px-8 bg-gray-200 rounded'
						onSubmit={handleLogin}
					>
						<h3 className='font-bold text-xl clearfix'>
							LOGIN
							<span
								className='cursor-pointer float-right leading-6'
								onClick={(e) => {
									setShowLogin(!showLogin)
								}}
							>
								<svg
									className='inline-block'
									xmlns='http://www.w3.org/2000/svg'
									width='24'
									height='24'
									viewBox='0 0 24 24'
									fill='none'
									stroke='#000000'
									strokeWidth='2'
									strokeLinecap='round'
									strokeLinejoin='round'
								>
									<line x1='18' y1='6' x2='6' y2='18'></line>
									<line x1='6' y1='6' x2='18' y2='18'></line>
								</svg>
							</span>
						</h3>
						<input
							type='text'
							placeholder='username'
							value={username}
							className='p-1 rounded shadow-inner my-2 block border-2 border-black'
							onChange={(e) => setUsername(e.target.value)}
						></input>
						<input
							type='password'
							placeholder='password'
							name='password'
							value={password}
							className='p-1 rounded shadow-inner my-2 block border-2 border-black'
							onChange={(e) => setPassword(e.target.value)}
						></input>
						<button className='py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded cursor-pointer text-center'>
							LOGIN
						</button>
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
					</form>
				</div>
			</div>
		</>
	)
}
