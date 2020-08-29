import React, { useState } from 'react'
import cx from 'classnames'
import X from '../icons/X'
import { useDispatch } from 'react-redux'

export default function ({ type = 'warning', message = '' }) {
	const dispatch = useDispatch()

	function close() {
		dispatch({
			type: 'error/close',
		})
	}

	return (
		<div
			className={cx('px-2 py-4 rounded absolute clearfix', {
				'bg-yellow-600': type === 'warning',
				'bg-red-600': type === 'danger',
				'bg-green-600': type === 'success',
				'text-white': type === 'danger' || type === 'success',
			})}
		>
			<div className='inline-block w-11/12 px-2'>{message}</div>
			<span
				className='inline-block w-1/12 cursor-pointer float-right'
				onClick={() => close()}
			>
				<X
					color={type === 'danger' || type === 'success' ? 'white' : 'black'}
				></X>
			</span>
		</div>
	)
}
