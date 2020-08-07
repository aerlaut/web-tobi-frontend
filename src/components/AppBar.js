import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function AppBar() {
  const [showLogin, setShowLogin] = useState(false)

  return (
    <React.Fragment>
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
            className="py-4 px-8 bg-gray-200 rounded"
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            <h3 className="font-bold text-xl">LOGIN</h3>
            <input
              type="text"
              placeholder="username"
              className="p-1 rounded shadow-inner my-2 block border-2 border-black"
            ></input>
            <input
              type="password"
              placeholder="password"
              className="p-1 rounded shadow-inner my-2 block border-2 border-black"
            ></input>
            <button className="py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded cursor-pointer text-center block">
              LOGIN
            </button>
          </form>
        </div>
      </div>
    </React.Fragment>
  )
}
