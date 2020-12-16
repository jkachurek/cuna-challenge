import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import ApplicationPage from './components/ApplicationPage'
import AccountForm from './components/AccountForm'

const Routes = () => (
  <Switch>
    <Route path='/prequalify'>
      <ApplicationPage />
    </Route>
    <Route path='/qualified'>
      <AccountForm />
    </Route>
    <Route path='/disqualified'>Disqualified!</Route>
    <Route path='*'>
      <Redirect to='/prequalify' />
    </Route>
  </Switch>
)

export default Routes
