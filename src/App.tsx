import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import useStyles from './App.styles'
import Routes from './Routes'

function App() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Router>
        <Routes />
      </Router>
    </div>
  )
}

export default App
