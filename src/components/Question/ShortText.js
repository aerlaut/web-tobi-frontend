import React from 'react'

export default function ({ content, idx}) {
  return (
    <div className="my-2">
      <label>Q. {idx}</label>
      <input
        type="text"
        value={content.label}
        className="border rounded w-full"
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
