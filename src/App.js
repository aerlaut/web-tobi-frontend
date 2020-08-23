import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

// Pages
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import QuestionIndex from './pages/Question/Index'
import QuestionCreate from './pages/Question/Create'
import QuestionShow from './pages/Question/Show'
import QuestionEdit from './pages/Question/Edit'
import Test from './pages/Test'

// Components
import Page from './components/Page'
import AppBar from './components/AppBar'

// Global imports
import './index.css'
import './styles/main.css'

export default function App() {
	return (
		<BrowserRouter>
			<AppBar />
			<main className='p-4'>
				<Switch>
					<Route exact path='/' exact component={Home} />
					<Route path='/login' component={Login} />
					<Route path='/dashboard' component={Dashboard} />
					<Route path='/page/:id' component={Page} />
					<Route path='/register' component={Register} />
					<Route exact path='/question' component={QuestionIndex} />
					<Route exact path='/question/create' component={QuestionCreate} />
					<Route exact path='/question/:id' component={QuestionShow} />
					<Route path='/question/:id/edit' component={QuestionEdit} />
					<Route path='/test' component={Test} />
				</Switch>
			</main>
		</BrowserRouter>
	)
}
