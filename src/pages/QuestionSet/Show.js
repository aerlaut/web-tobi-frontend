import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
	useAuth,
	fetchPageData,
	diffToBgColor,
	topicToLetter,
} from '../../helpers'
import Question from '../../components/Question'
import ChevronLeft from '../../icons/ChevronLeft'
import ChevronRight from '../../icons/ChevronRight'
import { Style } from 'react-style-tag'
import moment from 'moment'
import cx from 'classnames'

export default function () {
	const history = useHistory()
	const [error, setError] = useState()
	const [questionsId, setQuestionsId] = useState([])
	const [questionSet, setQuestionSet] = useState({ contents: [] })
	const [questionSetViewerIdx, setQuestionSetViewerIdx] = useState(0)

	const role = useSelector((state) => state.auth.role)

	useEffect(() => {
		// Fetch dashboard data
		fetchPageData({ auth: true }, (res) => {
			if (res.status !== 'ok') {
				setError({ type: 'error', message: res.message })
			} else {
				// Setting information
				setQuestionSet(res.data)
				setQuestionsId(res.data.contents.map((el) => el.id))
				setQuestionSetViewerIdx(0)
			}
		})
	}, [])

	let { id } = useParams()

	return (
		useAuth() && (
			<>
				<h1 className='text-xl font-bold mb-4'>
					Question Set ID : {id}
					{role === 'admin' || role === 'superadmin' ? (
						<span
							className='bg-blue-600 px-2 py-1 text-white font-bold float-right cursor-pointer text-base rounded'
							onClick={() => history.push(`/question_set/${id}/edit`)}
						>
							Edit
						</span>
					) : (
						''
					)}
				</h1>
				<div className='clearfix mb-4'>
					Created{' '}
					{moment
						.utc(questionSet.createdAt)
						.utcOffset('+07:00')
						.format('DD MMMM YYYY HH:mm:ss [WIB]')}
					<br />
					by <span className='italic'>{questionSet.author}</span>
					<br />
					{questionSet.isPublished
						? `Published ${moment
								.utc(questionSet.publishedAt)
								.utcOffset('+07:00')
								.format('DD MMMM YYYY HH:mm:ss [WIB]')}`
						: ''}
					<br />
				</div>

				<section className='my-4'>
					<h2 className='mb-4 font-bold'>Deskripsi</h2>
					<p>{questionSet.description}</p>
				</section>

				{/* Question Numbers */}
				<section className='bg-gray-100 rounded px-4 py-2 mt-4 shadow'>
					<h2 className='my-2 font-bold'>Questions in Set</h2>
					<div className='flex justify-start'>
						{questionSet.contents.length > 0 ? (
							<>
								{questionSet.contents.map((q, idx) => (
									<div
										className={cx(
											`rounded ${diffToBgColor(
												q.difficulty
											)} relative inline-block w-8 h-8 cursor-pointer cursor-pointer mr-2 mb-2`,
											{
												'active-question': questionSetViewerIdx === idx,
											}
										)}
										key={`qn_${idx}`}
									>
										{/* Background color : difficulty, content : topic */}
										<span
											className={'absolute text-white font-bold'}
											style={{
												top: '50%',
												left: '50%',
												transform: 'translate(-50%, -50%)',
											}}
										>
											{topicToLetter(q.topic)}
										</span>
									</div>
								))}
							</>
						) : (
							''
						)}
					</div>
				</section>

				{/* QuestionSet Viewer */}
				<section className='py-2'>
					{questionSet.contents.length > 0 ? (
						<>
							<h2 className='my-2 font-bold pb-2 mb-4 broder-b border-black'>
								QuestionSet Viewer
							</h2>
							<div className='p-8 rounded clearfix border border-black'>
								<div className='float-right'>
									<span className='p-2 mr-2 cursor-pointer bg-gray-100'>
										<ChevronLeft
											className='inline-block'
											onClick={() => {
												if (questionSetViewerIdx > 0) {
													setQuestionSetViewerIdx(questionSetViewerIdx - 1)
												}
											}}
										/>
									</span>
									<span className='p-2 rounded cursor-pointer bg-gray-100'>
										<ChevronRight
											className='inline-block'
											onClick={() => {
												if (questionSetViewerIdx < questionsId.length - 1) {
													setQuestionSetViewerIdx(questionSetViewerIdx + 1)
												}
											}}
										/>
									</span>
									<button
										className='rounded px-2 py-1 text-white bg-red-600 font-bold cursor-pointer text-sm ml-8'
										onClick={() => {
											let newArr = [...questionsId]
												.slice(0, questionSetViewerIdx)
												.concat(
													[...questionsId].slice(questionSetViewerIdx + 1)
												)

											// Delete at the
											if (questionSetViewerIdx == newArr.length) {
												setQuestionSetViewerIdx(newArr.length - 1)
											}

											// No more entries
											if (newArr.length == 0) {
												setQuestionSetViewerIdx(null)
											}

											setQuestionsId(newArr)
										}}
									>
										X
									</button>
								</div>
								<Question id={questionsId[questionSetViewerIdx]} />
							</div>
						</>
					) : (
						''
					)}
				</section>
				<Style>{`
              .active-question { border-color: #444 !important; border-width: 4px;}
              .active-question > span { color: black !important; }
            `}</Style>
			</>
		)
	)
}
