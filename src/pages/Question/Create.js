import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { auth, getPageData } from '../../helpers'
import Error from '../../components/Error'

export default function () {
  const history = useHistory()
  const [error, setError] = useState()

  useEffect(() => {
    // Fetch dashboard data
    getPageData((res) => {
      if (res !== 'ok') {
        setError({ type: 'error', message: res.message })
      } else {
        // Setting information
      }
    })
  })

  return (
    auth(history) && (
      <>
        {error && <Error type={error.type} message={error.message} />}
        <h1 className="text-xl font-bold mb-4">Buat Soal Baru</h1>
      </>
    )
  )
}
