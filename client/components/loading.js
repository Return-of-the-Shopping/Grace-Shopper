import React from 'react'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import Loader from 'react-loader-spinner'

export default function Loading(props) {
  return (
    <div className="centered-container">
      <Loader type="Circles" color="#f2b705" height={100} width={100} />
    </div>
  )
}
