import { Button, TextField, TextFieldProps } from '@material-ui/core'
import React, { useState } from 'react'

import useStyles from './styles'
import * as api from '../../api'
import useForm from '../../hooks/useForm'
import { NewAccountForm } from '../../types'
import { emailRegex, passwordRegex } from '../../util/validators'

type AccountFormField = 'username' | 'password' | 'passwordConfirm'

const AccountForm = () => {
  const classes = useStyles()
  const {
    // dirty,
    getFieldProps,
    valid,
    values
  } = useForm<AccountFormField>([
    'password',
    'passwordConfirm',
    'username'
  ], {
    password: (val: string) => passwordRegex.test(val),
    passwordConfirm: (val: string): boolean => val === values?.password,
    username: (val: string) => emailRegex.test(val)
  })

  const submitForm = async () => {
    try {
      await api.createAccount(values as NewAccountForm)
      // account successfully created
    } catch (err) {
      console.log(err.statusText)
    }
  }

  const isFormValid = !Object.values(valid).every(Boolean)

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
