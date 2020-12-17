import { Snackbar } from '@material-ui/core'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'
import React, { useState } from 'react'

import NotificationContext, {
  DEFAULT_NOTIFICATION_CONTEXT
} from '../../context/NotificationContext'
import * as types from '../../types'

const Alert = (props: AlertProps) => {
  return <MuiAlert elevation={6} variant='filled' {...props} /> 
}

const NotificationProvider: React.FunctionComponent = ({ children }) => {
  const [notification, setNotification] = useState(DEFAULT_NOTIFICATION_CONTEXT.notification)
  const [open, setOpen] = useState(DEFAULT_NOTIFICATION_CONTEXT.open)

  const context: types.NotificationContext = {
    closeNotification: () => {
      setOpen(false)
    },
    notification,
    open,
    setNotification: (notification) => {
      setNotification(notification)
      setOpen(true)
    }
  }

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    context.closeNotification()
  }

  return (
    <NotificationContext.Provider value={context}>
      {children}
      <Snackbar
        onClose={handleClose}
        open={open}
      >
        <Alert onClose={handleClose} severity={notification.severity}>
          {notification.message}
        </Alert>
      </Snackbar>
    </NotificationContext.Provider>
  )
}

export default NotificationProvider
