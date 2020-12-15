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
      inputRef={(ref: any) => {
        inputRef(ref ? ref.inputElement : null)
      }}
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
    actions,
    dirty,
    formState,
    warnings
  } = useApplicationForm()

  const submitForm = async () => {
    const formData = mapFormToPayload(formState)
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
  const getFieldProps = (field: ApplicationFormField): TextFieldProps => ({
    error: dirty[field] && !!warnings[field],
    helperText: dirty[field] && warnings[field],
    value: formState[field],
    variant: 'outlined'
  })
  const isFormValid = !Object.values(warnings).some(Boolean)

  return (
    <div className={clsx(classes.root, props.className)}>
      <TextField
        {...getFieldProps('price')}
        InputProps={{ inputComponent: CurrencyInput }}
        label='Purchase Price'
        onChange={e => actions.setPrice(e.target.value)}
      />
      <TextField
        {...getFieldProps('make')}
        label='Auto Make'
        onChange={e => actions.setMake(e.target.value)}
      />
      <TextField
        {...getFieldProps('model')}
        label='Auto Model'
        onChange={e => actions.setModel(e.target.value)}
      />
      <TextField
        {...getFieldProps('income')}
        InputProps={{ inputComponent: CurrencyInput }}
        label='Estimated Yearly Income'
        onChange={e => actions.setIncome(e.target.value)}
      />
      <TextField
        {...getFieldProps('creditScore')}
        InputProps={{ inputComponent: NumberInput }}
        label='Estimated Credit Score'
        onChange={e => actions.setCreditScore(e.target.value)}
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
