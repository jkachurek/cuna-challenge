import { Box, Typography } from '@material-ui/core'
import React from 'react'

import useStyles from './styles'
import PaperPanel from '../PaperPanel'

const DisqualificationPage = () => {
  const classes = useStyles()

  return (
    <PaperPanel className={classes.root} elevation={4}>
      <Typography variant='body1'>
        Thank you for your interest in Try Kach Financial.  Unfortunately,
        we are unable to offer you a loan at this time.  If you would like
        assistance, please contact our help desk at:
      </Typography>
      <Box display='flex' flexDirection='column' alignItems='center'>
        <Typography variant='subtitle2'>
          <a href='tel:5558675309'>(555)867-5309</a>
        </Typography>
        <Typography variant='subtitle2'>
          <a href='mailto:john@kachurek.com'>help@trykachfinancial.com</a>
        </Typography>
      </Box>
    </PaperPanel>
  )
}

export default DisqualificationPage
