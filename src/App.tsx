import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import Routes from './Routes'
import Layout from './components/Layout'
import NotificationProvider from './components/NotificationProvider'

function App() {
  return (
    <Router>
      <NotificationProvider>
        <Layout>
          <Routes />
        </Layout>
      </NotificationProvider>
    </Router>
  )
}

export default App
