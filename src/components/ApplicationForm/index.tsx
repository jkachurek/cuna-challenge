import { Button, TextField, TextFieldProps } from '@material-ui/core'
import clsx from 'clsx'
import React from 'react'
import { useHistory } from 'react-router-dom'
import MaskedInput from 'react-text-mask'
import { createNumberMask } from 'text-mask-addons'

import mapFormToPayload from './mapFormToPayload'
import useStyles from './styles'
import useApplicationForm from '../../hooks/useApplicationForm'
import * as api from '../../api'
import { ApplicationFormField, ApplicationFormResponse } from '../../types'

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
    dirty,
    setDirty,
    setValues,
    values,
    warnings
  } = useApplicationForm()

  const submitForm = async () => {
    const formData = mapFormToPayload(values)
    try {
      const response = await api.submitApplication(formData)
      const { preapproved }: ApplicationFormResponse = await response.json()
      if (preapproved) {
        history.push('/qualified')
      } else {
        // use `replace()` so user cannot go back
        history.replace('/disqualified')
      }
    } catch (err) {
      // handle bad request with front-end error msg?
      console.log(err.statusText)
    }
  }
  const getFieldProps = (name: ApplicationFormField): TextFieldProps => ({
    error: dirty[name] && !!warnings[name],
    helperText: dirty[name] && warnings[name],
    name,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues({
        ...values,
        [name]: e.target.value
      })
      setDirty({ ...dirty, [name]: true })
    },
    value: values[name],
    variant: 'outlined'
  })
  const isFormValid = !Object.values(warnings).some(Boolean)

  return (
    <div className={clsx(classes.root, props.className)}>
      <TextField
        {...getFieldProps('price')}
        InputProps={{ inputComponent: CurrencyInput as any }}
        label='Purchase Price'
      />
      <TextField
        {...getFieldProps('make')}
        label='Auto Make'
      />
      <TextField
        {...getFieldProps('model')}
        label='Auto Model'
      />
      <TextField
        {...getFieldProps('income')}
        InputProps={{ inputComponent: CurrencyInput as any }}
        label='Estimated Yearly Income'
      />
      <TextField
        {...getFieldProps('creditScore')}
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
