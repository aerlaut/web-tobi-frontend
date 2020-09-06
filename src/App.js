import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

// Pages
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

// Components
import Page from './components/Page'
import AppBar from './components/AppBar'
import QuestionRoutes from './routes/QuestionRoutes'
import QuestionSetRoutes from './routes/QuestionSetRoutes'
import UserRoutes from './routes/UserRoutes'

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
					<Route path='/about' exact component={Home} />
					<Route path='/login' component={Login} />
					<Route path='/dashboard' component={Dashboard} />
					<Route path='/page/:id' component={Page} />
					<Route path='/register' component={Register} />

					<QuestionRoutes />
					<QuestionSetRoutes />
					<UserRoutes />
				</Switch>
			</main>
		</BrowserRouter>
	)
}
