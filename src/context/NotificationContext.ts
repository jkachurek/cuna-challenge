import { createContext, useContext } from 'react'
import * as types from '../types'

export const DEFAULT_NOTIFICATION_CONTEXT: types.NotificationContext = {
  closeNotification: () => {},
  notification: {
    message: '',
    severity: undefined
  },
  open: false,
  setNotification: () => {},
}

const NotificationContext = createContext(DEFAULT_NOTIFICATION_CONTEXT)

export const useNotificationContext = () => useContext(NotificationContext)

export default NotificationContext
