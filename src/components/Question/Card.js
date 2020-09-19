import React from 'react'

export default function ({ question }) {
	return (
		<div className='border border-gray-800 bg-gray-100 rounded mr-4 mb-4 p-4 cursor-pointer shadow flex flex-col justify-end min-h-full'>
			<div className='flex-1'>
				<h3 className='font-xl font-bold mb-2'>
					<span>#{question.id}</span>
					<span className='px-1 py-1 text-sm rounded bg-yellow-500 ml-2'>
						{question.tier}
					</span>
					<span className='float-right'>{question.difficulty}</span>
				</h3>
				<p className='mt-2 mb-4'>{question.description}</p>
			</div>
			<div>
				<span>
					{question.topics.map((t, idx) => (
						<span
							key={`q_${question.id}_t_${idx}`}
							className='px-1 py-1 text-sm rounded bg-yellow-300 mr-2'
						>
							{t.name}
						</span>
					))}
				</span>
			</div>
			<div className='mt-2'>
				<span>
					{question.subtopics.map((t, idx) => (
						<span
							key={`q_${question.id}_st_${idx}`}
							className='px-1 py-1 text-sm rounded bg-yellow-500 mr-2'
						>
							{t.name}
						</span>
					))}
				</span>
			</div>
		</div>
	)
}
