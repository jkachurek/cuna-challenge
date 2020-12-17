import { Button, TextField, TextFieldProps } from '@material-ui/core'
import clsx from 'clsx'
import React from 'react'
import { useHistory } from 'react-router-dom'
import MaskedInput from 'react-text-mask'
import { createNumberMask } from 'text-mask-addons'

import mapFormToPayload from './mapFormToPayload'
import useStyles from './styles'
import { useNotificationContext } from '../../context/NotificationContext'
import useForm from '../../hooks/useForm'
import * as api from '../../api'
import {
  ApplicationForm as ApplicationFormState,
  ApplicationFormField,
  ApplicationFormResponse
} from '../../types'

const currencyMask = createNumberMask({})
const numberMask = createNumberMask({ prefix: '' })

const MaskedInputWithRef = ({ inputRef, ...rest }: any) => {
  return (
    <MaskedInput
      {...rest}
    />
  )
}
const CurrencyInput = (props: any) => (
  <MaskedInputWithRef {...props} mask={currencyMask} />
)
const NumberInput = (props: any) => (
  <MaskedInputWithRef {...props} mask={numberMask} />
)

interface ApplicationFormProps {
  className?: string
}

const ApplicationForm = (props: ApplicationFormProps) => {
  const classes = useStyles()
  const history = useHistory()
  const {
    getFieldProps,
    valid,
    values
  } = useForm<ApplicationFormField>([
    'creditScore',
    'income',
    'make',
    'model',
    'price'
  ], {
    creditScore: (val: string) => !!(val && ~~val >= 300 && ~~val <= 850),
    income: (val: string) => !!val,
    make: (val: string) => !!val,
    model: (val: string) => !!val,
    // this gets validated in the API
    price: (val: string) => !!val
  })

  const { setNotification } = useNotificationContext()

  const submitForm = async () => {
    const formData = mapFormToPayload(values as ApplicationFormState)
    try {
      const response = await api.submitApplication(formData)
      const { preapproved }: ApplicationFormResponse = await response.json()
      if (preapproved) {
        setNotification({
          message: 'Application approved!',
          severity: 'success'
        })
        history.push('/new-user')
      } else {
        // use `replace()` so user cannot go back
        history.replace('/disqualified')
      }
    } catch (err) {
      setNotification({
        message: err?.statusText ?? 'An error occurred while processing your application',
        severity: 'error'
      })
    }
  }

  const isFormValid = Object.values(valid).every(Boolean) && Object.values(values).every(Boolean)

  return (
    <div className={clsx(classes.root, props.className)}>
      <TextField
        {...getFieldProps('price') as TextFieldProps}
        helperText={!valid.price && 'Price is required'}
        InputProps={{ inputComponent: CurrencyInput as any }}
        label='Purchase Price'
      />
      <TextField
        {...getFieldProps('make') as TextFieldProps}
        helperText={!valid.make && 'Make is required'}
        label='Auto Make'
      />
      <TextField
        {...getFieldProps('model') as TextFieldProps}
        helperText={!valid.model && 'Model is required'}
        label='Auto Model'
      />
      <TextField
        {...getFieldProps('income') as TextFieldProps}
        helperText={!valid.income && 'Estimated Yearly Income is required'}
        InputProps={{ inputComponent: CurrencyInput as any }}
        label='Estimated Yearly Income'
      />
      <TextField
        {...getFieldProps('creditScore') as TextFieldProps}
        helperText={!valid.creditScore && 'Credit Score must be between 300 and 850'}
        InputProps={{ inputComponent: NumberInput as any }}
        label='Estimated Credit Score'
      />
      <Button
        color='primary'
        disabled={!isFormValid}
        onClick={submitForm}
        size='large'
        variant='contained'
      >
        Submit
      </Button>
    </div>
  )
}

export default ApplicationForm
