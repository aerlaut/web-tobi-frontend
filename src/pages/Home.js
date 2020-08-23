import React from 'react'
import { useAuth } from '../helpers'

export default function () {
	return <>{useAuth(false) && <div>Home page</div>}</>
}
