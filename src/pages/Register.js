import React, { useState } from 'react'

export default function () {
  const [fullName, setFullName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    // Form validation
    if (password != passwordConfirmation) {
      alert('Password is not the same')
      return
    }

    // Submit form
    let form = document.querySelector('form')
    let formData = new FormData(form)

    fetch('/user/create', {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  return (
    <>
      <h1 class="text-xl font-bold mb-4">Registrasi User</h1>

      <form class="flex flex-col" onSubmit={handleSubmit}>
        <label class="my-2">
          <span class="w-1/12 inline-block">Nama lengkap</span>
          <input
            type="text"
            class="w-2/12 p-1 border border-black shadow-inside rounded"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            name="fullname"
          ></input>
        </label>

        <label class="my-2">
          <span class="w-1/12 inline-block">Username</span>
          <input
            type="text"
            class="w-2/12 p-1 border border-black shadow-inside rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            name="username"
          ></input>
        </label>

        <label class="my-2">
          <span class="w-1/12 inline-block">Email</span>
          <input
            type="text"
            class="w-2/12 p-1 border border-black shadow-inside rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </label>

        <label class="my-2">
          <span class="w-1/12 inline-block">Password</span>
          <input
            type="password"
            class="w-2/12 p-1 border border-black shadow-inside rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
          ></input>
        </label>

        <label class="my-2">
          <span class="w-1/12 inline-block">Confirm Password</span>
          <input
            type="password"
            class="w-2/12 p-1 border border-black shadow-inside rounded"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          ></input>
        </label>

        <button class="mt-4 py-2 px-4 text-white bg-blue-600 rounded font-bold">
          Buat
        </button>
      </form>
    </>
  )
}
