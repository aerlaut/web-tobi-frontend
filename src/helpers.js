import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

// Block off
function useAuth(protectedPage = true) {
	const history = useHistory()
	const dispatch = useDispatch()

	const isAuth = useSelector((state) => state.auth.isAuth)
	const role = useSelector((state) => state.auth.role)

	// If use is not logged in, check for token
	if (!isAuth && localStorage.getItem('token') !== null) {
		const tokenRole = localStorage.getItem('role')

		dispatch({
			type: 'auth/logUserIn',
			payload: {
				username: localStorage.getItem('username'),
				role: tokenRole,
			},
		})

		// Is in protected page, redirect
		if (protectedPage && tokenRole !== 'admin' && tokenRole !== 'superadmin') {
			history.push('/login')
			return false
		}

		return true
	} else if (protectedPage && role !== 'admin' && role !== 'superadmin') {
		// Is in protected page, redirect
		history.push('/login')
		return false
	}

	return true
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

export { useAuth, fetchPageData }
