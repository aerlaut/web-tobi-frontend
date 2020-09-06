import React from 'react'
import { Route } from 'react-router-dom'

import {
	UserIndex,
	UserCreate,
	UserShow,
	UserEdit,
} from '../pages/User/components'

export default function () {
	return (
		<>
			<Route exact path='/user' component={UserIndex} />
			<Route exact path='/user/create' component={UserCreate} />
			<Route exact path='/user/profile' component={UserShow} />
			<Route exact path='/user/:id' component={UserShow} />
			<Route path='/user/:id/edit' component={UserEdit} />
		</>
	)
}
