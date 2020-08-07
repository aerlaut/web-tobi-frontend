import React, { useState } from 'react'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'

// Pages
import Home from './pages/Home'
import Register from './pages/Register'

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
      <main class="p-4">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/page/:id" component={Page} />
          <Route path="/register" component={Register} />
        </Switch>
      </main>
    </BrowserRouter>
  )
}
