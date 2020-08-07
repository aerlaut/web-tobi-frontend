import React, { useState } from 'react'

export default function () {
  return (
    <React.Fragment>
      <h1 class="text-xl font-bold mb-4">Registrasi User</h1>

      <form class="flex flex-col">
        <label class="my-2">
          <span class="w-1/12 inline-block">Nama lengkap</span>
          <input
            type="text"
            class="w-2/12 p-1 border border-black shadow-inside rounded"
          ></input>
        </label>

        <label class="my-2">
          <span class="w-1/12 inline-block">Username</span>
          <input
            type="text"
            class="w-2/12 p-1 border border-black shadow-inside rounded"
          ></input>
        </label>

        <label class="my-2">
          <span class="w-1/12 inline-block">Email</span>
          <input
            type="text"
            class="w-2/12 p-1 border border-black shadow-inside rounded"
          ></input>
        </label>

        <button class="mt-4 py-2 px-4 text-white bg-blue-600 rounded font-bold">
          Buat
        </button>
      </form>
    </React.Fragment>
  )
}
