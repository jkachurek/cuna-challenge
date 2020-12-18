import { cleanup, render, waitFor } from '@testing-library/react'
import React from 'react'
import { mocked } from 'ts-jest'

import AccountForm from '.'
import * as api from '../../api'
import { useNotificationContext } from '../../context/NotificationContext'
import useForm from '../../hooks/useForm'
import { NotificationContext } from '../../types'

const mockedContext = mocked(useNotificationContext)
jest.mock('../../context/NotificationContext')
const mockedForm = mocked(useForm)
jest.mock('../../hooks/useForm')
const mockedApi = mocked(api)
jest.mock('../../api')

const emptyContext: NotificationContext = {
  closeNotification: jest.fn(),
  notification: { message: '', severity: undefined },
  open: false,
  setNotification: jest.fn()
}
const emptyForm = {
  getFieldProps: jest.fn(),
  valid: {
    username: true,
  },
  values: {
    username: 'mockUsername'
  }
}

describe('AccountForm component', () => {
  afterEach(() => {
    cleanup()
    jest.resetAllMocks()
  })
  test('submits account info and notifies user when account created', async () => {
    mockedContext.mockReturnValue(emptyContext)
    mockedForm.mockReturnValue(emptyForm)
    const { getByText } = render(<AccountForm />)
    getByText('Create Account').click()
    await expect(mockedApi.createAccount).toHaveBeenCalled()
    await waitFor(() => {
      expect(emptyContext.setNotification).toHaveBeenCalledWith({
        // we don't care about the precise message, just that it's successful
        message: expect.any(String),
        severity: 'success'
      })
    })
  })
})
