import React from 'react'

export default function ({ match }) {
  return (
    <React.Fragment>
      <div>About {match.params.id} </div>
    </React.Fragment>
  )
}
