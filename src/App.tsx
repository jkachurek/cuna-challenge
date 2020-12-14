import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import './App.css'
// will add routing later
import Routes from './Routes'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes />
      </Router>
    </div>
  )
}

export default App
