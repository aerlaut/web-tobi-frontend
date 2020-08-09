import React, { useState } from 'react'
import cx from 'classnames'

export default function FieldOption() {
  const [invisible, setInvisible] = useState(true)

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
          <button className="px-1 text-sm px-1 rounded border mx-2 font-semibold">
            + Text
          </button>
          <button className="px-1 text-sm px-1 rounded border mx-2 font-semibold">
            + Answer
          </button>
          <hr />
        </div>
      </div>
    </>
  )
}
