import React from 'react'

export default function AppBar() {
  return (
    <nav className="p-4 border-gray-400 bg-gray-200 border-b-2 shadow clearfix">
      <img className="logo"></img>
      <div className="float-right">
        <a
          className="py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded"
          href=""
        >
          Login
        </a>
      </div>
    </nav>
  )
}
