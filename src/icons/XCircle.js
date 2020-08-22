import React from 'react'
const XCircle = ({
	size = 24,
	color = '#000000',
	fill = '#FFFFFF',
	className,
}) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width={size}
		height={size}
		viewBox='0 0 24 24'
		fill={fill}
		stroke={color}
		strokeWidth='2'
		strokeLinecap='round'
		strokeLinejoin='round'
		className={className != null ? className : ''}
	>
		<circle cx='12' cy='12' r='10'></circle>
		<line x1='15' y1='9' x2='9' y2='15'></line>
		<line x1='9' y1='9' x2='15' y2='15'></line>
	</svg>
)
export default XCircle
