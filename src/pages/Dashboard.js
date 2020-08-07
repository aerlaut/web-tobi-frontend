import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

export default function () {
  const history = useHistory()

  return (
    <>
      <h1 className="text-xl font-bold mb-4">Dashboard</h1>
      Dashboard
    </>
  )
}
