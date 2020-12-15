import { Typography } from '@material-ui/core'
import React from 'react'

import useStyles from './styles'
import ApplicationForm from '../ApplicationForm'

const ApplicationPage = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <ApplicationForm className={classes.form} />
      <Typography className={classes.copy} variant='body1'>
        This is where the fake body copy will go!
      </Typography>
    </div>
  )
}

export default ApplicationPage
