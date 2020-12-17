import { Button, TextField, TextFieldProps } from '@material-ui/core'
import React from 'react'
import { useHistory } from 'react-router-dom'

import useStyles from './styles'
import * as api from '../../api'
import { useNotificationContext } from '../../context/NotificationContext'
import useForm from '../../hooks/useForm'
import { NewAccountForm } from '../../types'
import { emailRegex, passwordRegex } from '../../util/validators'

type AccountFormField = 'username' | 'password' | 'passwordConfirm'

const AccountForm = () => {
  const classes = useStyles()
  const history = useHistory()
  const {
    getFieldProps,
    valid,
    values
  } = useForm<AccountFormField>([
    'password',
    'passwordConfirm',
    'username'
  ], {
    password: (val: string) => !!(val && passwordRegex.test(val)),
    passwordConfirm: (val: string): boolean => !!(val && val === values?.password),
    username: (val: string) => !!(val && emailRegex.test(val))
  })

  const { setNotification } = useNotificationContext()

  const submitForm = async () => {
    try {
      await api.createAccount(values as NewAccountForm)
      setNotification({
        message: 'Account successfully created!',
        severity: 'success'
      })
      history.push('/prequalify')
    } catch (err) {
      // there's no way for this to trigger in this demo application,
      // but why not handle it anyway
      setNotification({
        message: err?.statusText ?? 'An error occurred while creating your account',
        severity: 'error'
      })
    }
  }

  const isFormValid = Object.values(valid).every(Boolean) && Object.values(values).every(Boolean)

  return (
    <div className={classes.root}>
      <TextField
        {...getFieldProps('username') as TextFieldProps}
        helperText={!valid.username && 'Username must be a valid email address'}
        label='Username / Email'
      />
      <TextField
        {...getFieldProps('password') as TextFieldProps}
        helperText={!valid.password && 'Password must contain at least 8 characters, including a number or special character'}
        label='Password'
        type='password'
      />
      <TextField
        {...getFieldProps('passwordConfirm') as TextFieldProps}
        helperText={!valid.passwordConfirm && 'Passwords must match'}
        label='Confirm Password'
        type='password'
      />
      <Button
        color='primary'
        disabled={!isFormValid}
        onClick={submitForm}
        size='large'
        variant='contained'
      >
        Create Account
      </Button>
    </div>
  )
}

export default AccountForm
