import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useEffect } from 'react'

// Block off
function useAuth(protectedPage = true, permissions = {}) {
	const history = useHistory()
	const dispatch = useDispatch()

	const defaultPermissions = {
		superadmin: true,
		admin: true,
		user: true,
	}

	// Default option settings
	permissions = Object.assign(defaultPermissions, permissions)

	const auth = useSelector((state) => state.auth)

	// Function-wide variable
	let isAuth = auth.isAuth
	let role = auth.role

	// If use is not logged in, check for token then login.
	// Sets value for local variable in startup run
	if (!auth.isAuth && localStorage.getItem('token') !== null) {
		const tokenRole = localStorage.getItem('role')

		dispatch({
			type: 'auth/logUserIn',
			payload: {
				username: localStorage.getItem('username'),
				role: tokenRole,
				id: localStorage.getItem('uid'),
				_id: localStorage.getItem('_uid'),
			},
		})

		isAuth = true
		role = tokenRole
	}

	// If not protected page, can see
	if (!protectedPage) {
		return true
	}

	// If at protected page, but not auth
	if (protectedPage && !isAuth) {
		// Is in protected page, redirect
		history.push('/')
		return false
	}

	// If at protected page, and is auth, check permission
	if (protectedPage && isAuth && permissions[role]) {
		return true
	}

	console.log('out of bounds')

	history.push('/')
	return false
}

// Get function to get page data
function fetchPageData(options, handler) {
	const { auth } = options

	// Requires authorization
	let headers = new Headers()
	if (auth) {
		if (localStorage.getItem('token') !== null) {
			headers.append('Authorization', `Bearer ${localStorage.getItem('token')}`)
		} else {
			// Log out
			localStorage.clear()
			window.location.href = ''
		}
	}

	// Fetching...
	let url = window.location.pathname
	fetch(`${process.env.REACT_APP_API_URL}${url}`, {
		// url includes beginning '/'
		method: 'GET',
		headers: headers,
	})
		.then((res) => {
			if (!res.ok) {
				throw new Error()
			}
			return res.json()
		})
		.then((res) => {
			handler(res)
		})
		.catch((err) => console.error(err))
}

// Change diff to BG color
function diffToBgColor(diff) {
	return diff < 2
		? 'bg-green-400'
		: diff < 3
		? 'bg-yellow-400'
		: diff < 4
		? 'bg-orange-400'
		: 'bg-red-400'
}

// Change topic to letter
function topicToLetter(topic) {
	let letter = ''

	switch (topic) {
		case 'Biselmol':
			letter = 'B'
			break
		case 'Anfiswan':
			letter = 'H'
			break
		case 'Anfistum':
			letter = 'T'
			break
		case 'Genevo':
			letter = 'G'
			break
		case 'Bistik':
			letter = 'S'
			break
		case 'Ekologi':
			letter = 'E'
			break
		case 'Etologi':
			letter = 'P'
			break
	}

	return letter
}

export { useAuth, fetchPageData, diffToBgColor, topicToLetter }
