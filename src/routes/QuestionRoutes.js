import React from 'react'
import { Route } from 'react-router-dom'

import {
	QuestionIndex,
	QuestionCreate,
	QuestionShow,
	QuestionEdit,
} from '../pages/Question/components'

export default function () {
	return (
		<>
			<Route exact path='/question' component={QuestionIndex} />
			<Route exact path='/question/create' component={QuestionCreate} />
			<Route exact path='/question/:id' component={QuestionShow} />
			<Route path='/question/:id/edit' component={QuestionEdit} />
			<Route exact path='/question' component={QuestionIndex} />
		</>
	)
}
