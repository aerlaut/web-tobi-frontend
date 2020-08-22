import React, { useState } from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import QuestionIndex from "./pages/Question/Index";
import QuestionCreate from "./pages/Question/Create";
import QuestionShow from "./pages/Question/Show";
import Test from "./pages/Test";

// Components
import Page from "./components/Page";
import AppBar from "./components/AppBar";

// Global imports
import "./index.css";
import "./styles/main.css";

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
          <Route path="/question/create" component={QuestionCreate} />
          <Route path="/question/:id" component={QuestionShow} />
          <Route path="/question" component={QuestionIndex} />
          <Route path="/test" component={Test} />
        </Switch>
      </main>
    </BrowserRouter>
  );
}
