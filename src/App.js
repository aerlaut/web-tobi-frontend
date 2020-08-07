import React, { useState } from 'react'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'

// Pages
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

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
      <main className="p-4">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/page/:id" component={Page} />
          <Route path="/register" component={Register} />
        </Switch>
      </main>
    </BrowserRouter>
  )
}
