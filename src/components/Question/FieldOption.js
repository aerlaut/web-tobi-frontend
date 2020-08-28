import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import cx from 'classnames'

export default function FieldOption({ idx }) {
	const [invisible, setInvisible] = useState(true)

	const dispatch = useDispatch()

	return (
		<>
			<div
				className='-mt-4 mb-4'
				onMouseOver={() => setInvisible(false)}
				onMouseOut={() => setInvisible(true)}
			>
				<div
					className={cx('flex justify-center cursor-pointer', {
						'opacity-25': invisible,
					})}
				>
					<button
						className='px-1 text-sm px-1 rounded border mx-2 font-semibold'
						onClick={(e) => {
							dispatch({
								type: 'question/addField',
								payload: { type: 'short_text_answer', idx: idx },
							})
						}}
					>
						+ Field
					</button>
					<hr />
				</div>
			</div>
		</>
	)
}
