import React from 'react'
import { Route } from 'react-router-dom'

import {
	QuestionSetIndex,
	QuestionSetCreate,
	QuestionSetShow,
	QuestionSetEdit,
} from '../pages/QuestionSet/components'

export default function () {
	return (
		<>
			<Route exact path='/question/create' component={QuestionSetCreate} />
			<Route exact path='/question/:id' component={QuestionSetShow} />
			<Route path='/question/:id/edit' component={QuestionSetEdit} />
			<Route exact path='/question' component={QuestionSetIndex} />
		</>
	)
}
