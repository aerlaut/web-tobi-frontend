import React from 'react'
import cx from 'classnames'

export default function (props) {
  return (
    <div
      className={cx('px-2 py-4', {
        'bg-yellow-600': props.type === 'warning',
        'bg-red-600': props.type === 'error',
        'bg-green-600': props.type === 'success',
        'text-white': props.type === 'error' || props.type === 'success',
      })}
    >
      {props.message}
    </div>
  )
}
