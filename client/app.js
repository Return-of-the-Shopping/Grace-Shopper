import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
import HomePage from './components/home-page'

const App = () => {
  return (
    <div>
      <Navbar />
      {/* <Routes /> */}
      <HomePage />
    </div>
  )
}

export default App
