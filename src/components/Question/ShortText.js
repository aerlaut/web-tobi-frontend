import React from 'react'
import { useDispatch } from 'react-redux'

export default function ({ content, idx}) {

  let type = 'answer_short_text'
  const dispatch = useDispatch()

  return (
    <div className="my-2">
      <label>Q. {idx}</label>
      <input
        type="text"
        value={content}
        className="border rounded w-full"
        onChange={(e) => { dispatch({
            type: 'question/updateField',
            payload: {
              idx: idx,
              type: type,
              content: e.target.value
              },
          })
        }
        }
      />
      <input
        type="text"
        value=""
        disabled
        className="border rounded border-black w-full"
      />
    </div>
  )
}
