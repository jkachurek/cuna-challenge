import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import ApplicationForm from './components/ApplicationForm'

const Routes: React.FunctionComponent = () => (
  <Switch>
    <Route path='/prequalify'>
      <ApplicationForm />
    </Route>
    {/* <Route path='/qualified'></Route> */}
    {/* <Route path='/disqualified'></Route> */}
    <Route path='*'>
      <Redirect to='/prequalify' />
    </Route>
  </Switch>
)

export default Routes
