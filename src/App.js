import React, { useState } from 'react'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'

import Page from './components/Page'
import AppBar from './components/AppBar'
import Home from './pages/Home'

import './index.css'
import './styles/main.css'

export default function App() {
  return (
    <BrowserRouter>
      <AppBar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/page/:id" component={Page} />
      </Switch>
    </BrowserRouter>
  )
}
