import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import cx from 'classnames'

export default function () {
  const history = useHistory()

  const [fullName, setFullName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [formStatus, setFormStatus] = useState('')

  function handleSubmit(e) {
    e.preventDefault()

    // Form validation
    if (password !== passwordConfirmation) {
      alert('Password is not the same')
      return
    }

    // Submit form
    let form = document.getElementById('form')

    fetch(`${process.env.REACT_APP_API_URL}/user/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fullname: fullName,
        username: username,
        email: email,
        password: password,
      }),
    })
      .then((res) => {
        console.log(res)

        if (!res.ok) {
          throw new Error('Error creating user')
        }
        return res.json()
      })
      .then((res) => {
        if (res.status != 'ok') {
          setFormStatus({ type: 'error', message: res.message })
        } else {
          // Forward to login page
          setFormStatus({
            type: 'success',
            message: 'Account created, redirecting to login page...',
          })
          history.push('/login')
        }
      })
      .catch((err) => {
        // Show error details
        console.log(err)
        setFormStatus({ type: 'error', message: 'Connection error' })
      })
  }

  return (
    <>
      <h1 className="text-xl font-bold mb-4">Registrasi User</h1>

      <form id="form" className="flex flex-col" onSubmit={handleSubmit}>
        <label className="my-2">
          <span className="w-1/12 inline-block">Nama lengkap</span>
          <input
            type="text"
            className="w-2/12 p-1 border border-black shadow-inside rounded"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            name="fullname"
          ></input>
        </label>

        <label className="my-2">
          <span className="w-1/12 inline-block">Username</span>
          <input
            type="text"
            className="w-2/12 p-1 border border-black shadow-inside rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            name="username"
          ></input>
        </label>

        <label className="my-2">
          <span className="w-1/12 inline-block">Email</span>
          <input
            type="text"
            className="w-2/12 p-1 border border-black shadow-inside rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </label>

        <label className="my-2">
          <span className="w-1/12 inline-block">Password</span>
          <input
            type="password"
            className="w-2/12 p-1 border border-black shadow-inside rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
          ></input>
        </label>

        <label className="my-2">
          <span className="w-1/12 inline-block">Confirm Password</span>
          <input
            type="password"
            className="w-2/12 p-1 border border-black shadow-inside rounded"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          ></input>
        </label>

        {formStatus === '' ? null : (
          <p
            className={cx('text-white rounded py-2 px-4', {
              'bg-red-800': formStatus.type === 'error',
              'bg-green-600': formStatus.type === 'success',
            })}
          >
            {formStatus.message}
          </p>
        )}

        <button className="mt-4 py-2 px-4 text-white bg-blue-600 rounded font-bold">
          Buat
        </button>
      </form>
    </>
  )
}
