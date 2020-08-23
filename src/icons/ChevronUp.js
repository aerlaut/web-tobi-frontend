import React from 'react'
const ChevronUp = ({ size = 24, color = '#000000', className = null }) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width={size}
		height={size}
		viewBox='0 0 24 24'
		fill='none'
		stroke={color}
		strokeWidth='2'
		strokeLinecap='round'
		strokeLinejoin='round'
		className={className != null ? className : ''}
	>
		<path d='M18 15l-6-6-6 6' />
	</svg>
)
export default ChevronUp
