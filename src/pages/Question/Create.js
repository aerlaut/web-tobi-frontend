import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { auth, getPageData } from '../../helpers'
import Error from '../../components/Error'
import Field from '../../components/Question/Field'
import FieldOption from '../../components/Question/FieldOption'

import { useSelector, useDispatch } from 'react-redux'

export default function () {
  const history = useHistory()
  const [error, setError] = useState('')
  const dispatch = useDispatch()

  const author = useSelector((state) => state.author)
  const tier = useSelector((state) => state.tier)
  const maxScore = useSelector((state) => state.maxScore)
  const official = useSelector((state) => state.official)
  const difficulty = useSelector((state) => state.difficulty)

  const content = useSelector((state) => state.content)

  const tiers = [
    {
      value: 'osk',
      name: 'OSK',
    },
    {
      value: 'osp',
      name: 'OSP',
    },
    {
      value: 'osn',
      name: 'OSN',
    },
    {
      value: 'pelatnas',
      name: 'Pelatnas',
    },
    {
      value: 'ibo',
      name: 'IBO',
    },
  ]

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

        <div className="flex">
          <div className="w-1/2 flex flex-col">
            <label className="my-2">
              <span className="w-2/12 inline-block">Author</span>
              <input
                type="text"
                className="w-2/12 p-1 border border-black shadow-inside rounded"
                value={author}
                onChange={(e) => {
                  dispatch({
                    type: 'question/setAuthor',
                    payload: { content: e.target.value },
                  })
                }}
              ></input>
            </label>

            <label className="my-2">
              <span className="w-2/12 inline-block">Tier</span>
              <select
                onChange={(e) =>
                  dispatch({
                    type: 'question/setTier',
                    payload: { content: e.target.value },
                  })
                }
                value={tier}
                className="border rounded p-1 border-black w-2/12"
              >
                {tiers.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="my-2">
              <span className="w-2/12 inline-block">Official?</span>
              <select
                value={official}
                onChange={(e) =>
                  dispatch({
                    type: 'question/setOfficial',
                    payload: { content: e.target.value },
                  })
                }
                className="border rounded p-1 border-black w-2/12"
              >
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </select>
            </label>
          </div>
          <div className="w-1/2 flex flex-col">
            <label className="my-2">
              <span className="w-2/12 inline-block">Difficulty</span>
              <input
                type="range"
                className="w-2/12 p-1 border border-black shadow-inside rounded"
                min="1"
                max="5"
                value={difficulty}
                onChange={(e) =>
                  dispatch({
                    type: 'question/setDifficulty',
                    payload: { content: e.target.value },
                  })
                }
              ></input>
            </label>

            <label className="my-2">
              <span className="w-2/12 inline-block">Maximum Score</span>
              <input
                type="text"
                className="w-1/12 p-1 border border-black shadow-inside rounded"
                value={maxScore}
                onChange={(e) =>
                  dispatch({
                    type: 'question/setMaxScore',
                    payload: { content: e.target.value },
                  })
                }
              ></input>
            </label>
          </div>
        </div>
        <div className="my-2">
          <strong>Topics</strong>
          <div
            className="rounded border border-black"
            style={{ minHeight: 2 + 'em' }}
          ></div>
        </div>
        <div className="my-2">
          <strong>Subtopics</strong>
          <div
            className="rounded border border-black"
            style={{ minHeight: 2 + 'em' }}
          ></div>
        </div>

        {/* Question body */}
        <strong>Pertanyaan</strong>
        {content.map((field, idx) => (
          <>
            <Field
              type={field.type}
              key={idx}
              content={field.content}
              idx={idx + 1}
            />
            <FieldOption key={idx} idx={idx} />
          </>
        ))}
      </>
    )
  )
}
