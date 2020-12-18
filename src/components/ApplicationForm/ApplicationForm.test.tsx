import { cleanup, render, waitFor } from '@testing-library/react'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { mocked } from 'ts-jest'

import ApplicationForm from '.'
import * as api from '../../api'
import { useNotificationContext } from '../../context/NotificationContext'
import useForm from '../../hooks/useForm'
import { NotificationContext } from '../../types'
import blobify from '../../util/blobify'

const mockedUseHistory = mocked(useHistory)
jest.mock('react-router-dom', () => ({
  useHistory: jest.fn()
}))
const mockedContext = mocked(useNotificationContext)
jest.mock('../../context/NotificationContext')
const mockedForm = mocked(useForm)
jest.mock('../../hooks/useForm')
const mockedApi = mocked(api)
jest.mock('../../api')
jest.mock('./mapFormToPayload')

const validForm = {
  getFieldProps: jest.fn(),
  valid: {
    price: true,
  },
  values: {
    price: '$25,000'
  }
}
const emptyContext: NotificationContext = {
  closeNotification: jest.fn(),
  notification: { message: '', severity: undefined },
  open: false,
  setNotification: jest.fn()
}

// contents of form don't matter since we're not testing the form hook
// or the data mapping / shape / api
describe('ApplicationForm component', () => {
  afterEach(() => {
    cleanup()
    jest.resetAllMocks()
  })
  test('notifies user & navigates to account page on approval', async () => {
    mockedForm.mockReturnValue(validForm)
    mockedContext.mockReturnValue(emptyContext)
    const push = jest.fn()
    mockedUseHistory.mockReturnValue({ push } as any)
    const mockApprovalResponse = new Response(blobify({ preapproved: true }), { status: 200 })
    mockedApi.submitApplication.mockReturnValue(Promise.resolve(mockApprovalResponse))
    
    const { getByText } = render(<ApplicationForm />)
    getByText('Submit').click()
    await expect(mockedApi.submitApplication).toHaveBeenCalled()
    await waitFor(() => {
      expect(emptyContext.setNotification).toHaveBeenCalledWith({
        message: expect.any(String),
        severity: 'success'
      })
      expect(push).toHaveBeenCalledWith('/new-user')
    })
  })
  test('notifies user & navigates to disqualification page on rejection', async () => {
    mockedForm.mockReturnValue(validForm)
    mockedContext.mockReturnValue(emptyContext)
    const replace = jest.fn()
    mockedUseHistory.mockReturnValue({ replace } as any)
    const mockRejectionResponse = new Response(blobify({ preapproved: false }), { status: 200 })
    mockedApi.submitApplication.mockReturnValue(Promise.resolve(mockRejectionResponse))
    
    const { getByText } = render(<ApplicationForm />)
    getByText('Submit').click()
    await expect(mockedApi.submitApplication).toHaveBeenCalled()
    await waitFor(() => {
      // don't notify on rejection
      expect(emptyContext.setNotification).not.toHaveBeenCalled()
      // use replace instead of push when disqualified
      expect(replace).toHaveBeenCalledWith('/disqualified')
    })
  })
  test('notifies user when they make a bad request', async () => {
    mockedForm.mockReturnValue(validForm)
    mockedContext.mockReturnValue(emptyContext)
    const replace = jest.fn()
    const push = jest.fn()
    mockedUseHistory.mockReturnValue({ push, replace } as any)
    const mockBadRequestResponse = new Response(undefined, { status: 400 })
    mockedApi.submitApplication.mockReturnValue(Promise.resolve(mockBadRequestResponse))
    
    const { getByText } = render(<ApplicationForm />)
    getByText('Submit').click()
    await expect(mockedApi.submitApplication).toHaveBeenCalled()
    await waitFor(() => {
      expect(emptyContext.setNotification).toHaveBeenCalledWith({
        message: expect.any(String),
        severity: 'error'
      })
      // shouldn't navigate on bad request
      expect(push).not.toHaveBeenCalled()
      expect(replace).not.toHaveBeenCalled()
    })
  })
})
