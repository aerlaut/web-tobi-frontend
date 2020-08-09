import React from 'react'

export default function ({ content }) {
  console.log('short answer rendered')

  return (
    <div className="my-4">
      <label>{content.label}</label>
      <input type="text" value="" />
    </div>
  )
}
