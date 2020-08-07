import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function AppBar() {
  const [showLogin, setShowLogin] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()

    let form = document.getElementById('login')
    let formData = new FormData(form)

    fetch(`${process.env.REACT_APP_API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        // Save login information using localstorage
      })
      .catch((err) => console.error(err))
  }

  return (
    <>
      <nav className="p-4 border-gray-400 bg-gray-200 border-b-2 shadow clearfix">
        <Link to="/">
          <img className="logo" /> Logo
        </Link>
        <ul className="float-right flex">
          <li className="mr-4 inline-block">
            <Link className="py-2 px-4" to="/register">
              Register
            </Link>
          </li>
          <li>
            <a
              className="py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded cursor-pointer"
              onClick={() => setShowLogin(!showLogin)}
            >
              Login
            </a>
          </li>
        </ul>
      </nav>
      <div
        className={
          showLogin ? 'fixed w-screen h-screen fixed top-0 left-0' : 'hidden'
        }
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        onClick={(e) => {
          setShowLogin(!showLogin)
        }}
      >
        <div className="w-100 my-8 flex justify-center">
          <form
            id="login"
            className="py-4 px-8 bg-gray-200 rounded"
            onSubmit={handleLogin}
          >
            <h3 className="font-bold text-xl">LOGIN</h3>
            <input
              type="text"
              placeholder="username"
              value={username}
              className="p-1 rounded shadow-inner my-2 block border-2 border-black"
              onChange={(e) => setUsername(e.target.value)}
            ></input>
            <input
              type="password"
              placeholder="password"
              name="password"
              value={password}
              className="p-1 rounded shadow-inner my-2 block border-2 border-black"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <button className="py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded cursor-pointer text-center block">
              LOGIN
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
