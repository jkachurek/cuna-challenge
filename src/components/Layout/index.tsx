import { AppBar, Toolbar, Typography } from '@material-ui/core'
import React from 'react'

import useStyles from './styles'

const Layout: React.FunctionComponent = ({ children }) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <AppBar>
        <Toolbar>
          <Typography variant='h6'>Try Kach Financial</Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.appBarOffset} />
      {children}
    </div>
  )
}

export default Layout
