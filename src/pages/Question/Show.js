import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useAuth, fetchPageData } from '../../helpers'
import Question from '../../components/Question'
import { useSelector } from 'react-redux'

export default function () {
	const history = useHistory()
	const [error, setError] = useState()
	const [question, setQuestion] = useState({})

	const role = useSelector((state) => state.auth.role)
	const { id } = useParams()

	return useAuth() && <Question id={id} role={role} />
}
