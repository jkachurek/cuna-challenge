import { Button, TextField, TextFieldProps } from '@material-ui/core'
import React, { useState } from 'react'

import useStyles from './styles'
import * as api from '../../api'

type AccountFormField = 'username' | 'password' | 'passwordConfirm'

const AccountForm = () => {
  const classes = useStyles()
  const [values, setValues] = useState({
    password: '',
    passwordConfirm: '',
    username: ''
  })
  const [dirty, setDirty] = useState({
    password: false,
    passwordConfirm: false,
    username: false
  })

  const warnings = {
    password: '',
    passwordConfirm: '',
    username: ''
  }

  const submitForm = async () => {
    try {
      await api.createAccount({})
      // account successfully created
    } catch (err) {
      console.log(err.statusText)
    }
  }

  const getFieldProps = (name: AccountFormField): TextFieldProps => ({
    error: !!warnings[name],
    helperText: warnings[name],
    name,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues({
        ...values,
        [name]: e.target.value
      })
      setDirty({ ...dirty, [name]: true })
    },
    variant: 'outlined'
  })

  const isFormValid = !Object.values(warnings).some(Boolean)

  return (
    <div className={classes.root}>
      <TextField
        {...getFieldProps('username')}
        label='Username'
      />
      <TextField
        {...getFieldProps('password')}
        label='Password'
        type='password'
      />
      <TextField
        {...getFieldProps('passwordConfirm')}
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
