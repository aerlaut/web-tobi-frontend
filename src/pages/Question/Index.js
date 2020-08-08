import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { auth, getPageData } from '../../helpers'
import Error from '../../components/Error'
import NewItem from '../../icons/NewItem'

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
        <h1 className="text-xl font-bold mb-4">
          Question
          <span className="float-right">
            <Link
              to="/question/create"
              className="mr-4 px-4 py-2 bg-blue-600 rounded inline-block text-white text-sm"
            >
              <NewItem
                color="white"
                className="mr-4 inline-block align-text-top"
              />
              Buat Soal
            </Link>
          </span>
        </h1>
        Question
      </>
    )
  )
}
