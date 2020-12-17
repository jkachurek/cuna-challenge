import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import ApplicationPage from './components/ApplicationPage'
import AccountForm from './components/AccountForm'
import DisqualificationPage from './components/DisqualificationPage'

const Routes = () => (
  <Switch>
    <Route path='/prequalify'>
      <ApplicationPage />
    </Route>
    <Route path='/new-user'>
      <AccountForm />
    </Route>
    <Route path='/disqualified'>
      <DisqualificationPage />
    </Route>
    <Route path='*'>
      <Redirect to='/prequalify' />
    </Route>
  </Switch>
)

export default Routes
