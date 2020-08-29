import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAuth, fetchPageData } from '../../helpers'
import Error from '../../components/Error'
import NewItem from '../../icons/NewItem'
import { useSelector, useDispatch } from 'react-redux'

export default function () {
	const history = useHistory()
	const [displays, setDisplays] = useState('')
	const dispatch = useDispatch()

	// Redux states
	const error = useSelector((state) => state.error)

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
				setDisplays(res.data)
			}
		})
	}, [])

	return (
		useAuth() && (
			<>
				{error.show && <Error type={error.type} message={error.message} />}
				<div className='clearfix'>
					<h1 className='text-xl font-bold mb-4 inline-block'>Users</h1>
					<span className='float-right inline-block'>
						<Link
							to='/user/create'
							className='mr-4 px-4 py-2 bg-blue-600 rounded inline-block text-white text-sm'
						>
							<NewItem
								color='white'
								className='mr-2 inline-block align-text-top'
								size={16}
							/>
							Create
						</Link>
					</span>
					<div className='mb-4'>Search</div>
					<div className='flex flex-wrap'>
						{[...displays].map((el, idx) => (
							<div
								key={`i_${el.id}`}
								className='w-2/12 border border-gray-800 bg-gray-100 rounded mr-4 mb-4 p-4 cursor-pointer shadow'
								onClick={() => history.push(`/user/${el.id}`)}
							>
								<h3 className='font-xl font-bold'>{el.id}</h3>
								<h3>{el.username}</h3>
								<h3>{el.name}</h3>
							</div>
						))}
					</div>
				</div>
			</>
		)
	)
}
