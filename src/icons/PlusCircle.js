import React from 'react'
const PlusCircle = ({
	size = 24,
	color = '#000000',
	fill = '#FFFFFF',
	className = null,
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
		<line x1='12' y1='8' x2='12' y2='16'></line>
		<line x1='8' y1='12' x2='16' y2='12'></line>
	</svg>
)
export default PlusCircle
