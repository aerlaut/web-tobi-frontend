import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import cx from 'classnames'

export default function FieldOption({ idx }) {
  const [invisible, setInvisible] = useState(true)

  const dispatch = useDispatch()

  return (
    <>
      <div
        className="my-2"
        onMouseOver={() => setInvisible(false)}
        onMouseOut={() => setInvisible(true)}
      >
        <div
          className={cx('flex justify-center cursor-pointer', {
            invisible: invisible,
          })}
        >
          <button
            className="px-1 text-sm px-1 rounded border mx-2 font-semibold"
            onClick={(e) => {
              dispatch({
                type: 'question/addField',
                payload: { type: 'text', idx: idx },
              })
            }}
          >
            + Text
          </button>
          <button
            className="px-1 text-sm px-1 rounded border mx-2 font-semibold"
            onClick={(e) => {
              dispatch({
                type: 'question/addField',
                payload: { type: 'answer', idx: idx },
              })
            }}
          >
            + Answer
          </button>
          <hr />
        </div>
      </div>
    </>
  )
}
