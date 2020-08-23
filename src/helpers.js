import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

// Block off
function useAuth(protectedPage = true) {
	const history = useHistory()
	const dispatch = useDispatch()

	// Check for token, upload ser
	if (localStorage.getItem('token')) {
		dispatch({
			type: 'auth/logUserIn',
			payload: {
				username: localStorage.getItem('username'),
				role: localStorage.getItem('role'),
			},
		})
		return true
	}

	// Is in protected page, redirect
	if (protectedPage) {
		localStorage.clear()
		history.push('/login')
		return false
	}
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
