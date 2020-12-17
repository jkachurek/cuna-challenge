import { Typography } from '@material-ui/core'
import faker from 'faker'
import React from 'react'

import useStyles from './styles'
import ApplicationForm from '../ApplicationForm'
import PaperPanel from '../PaperPanel'

const ApplicationPage = () => {
  const classes = useStyles()
  const bodyCopy = faker.lorem.paragraph(5)
  return (
    <div className={classes.root}>
      <PaperPanel className={classes.form}>
        <ApplicationForm  />
      </PaperPanel>
      <PaperPanel className={classes.copy}>
        <Typography variant='body1'>
          Here at Try Kach Financial, we offer auto loans in order to satisfy
          the requirements of a coding challenge!  Our website was created by
          someone with a great knowledge of web development, but he is unfortunately
          very lacking in the particulars of the financial industry, so the rest
          of this text will just be lorem ipsum!
        </Typography>
        <Typography variant='body1'>{bodyCopy}</Typography>
      </PaperPanel>
    </div>
  )
}

export default ApplicationPage
