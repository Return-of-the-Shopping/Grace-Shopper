import React from 'react'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import Loader from 'react-loader-spinner'

export default function Loading(props) {
  return <Loader type="Puff" color="#f2b705" height={150} width={150} />
}
