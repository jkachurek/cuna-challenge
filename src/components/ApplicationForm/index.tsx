import { Box, Button, TextField } from '@material-ui/core'
import React from 'react'
import MaskedInput from 'react-text-mask'
import { createNumberMask } from 'text-mask-addons'

import useApplicationForm from '../../hooks/useApplicationForm'
import * as api from '../../api'
import { ApplicationFormData, ApplicationFormField, ApplicationFormResponse } from '../../types'

const currencyMask = createNumberMask({})
const numberMask = createNumberMask({ prefix: '' })

const CurrencyInput = (props: any) => (
  <MaskedInput {...props} mask={currencyMask} />
)
const NumberInput = (props: any) => (
  <MaskedInput {...props} mask={numberMask} />
)

const ApplicationForm = () => {
  const {
    actions,
    dirty,
    formState,
    warnings
  } = useApplicationForm()

  const submitForm = async () => {
    const formData: ApplicationFormData = {
      creditScore: Number(formState.creditScore),
      income: Number(formState.income),
      make: formState.make,
      model: formState.model,
      price: Number(formState.price)
    }
    try {
      const response = await api.submitApplication(formData)
      const { preapproved }: ApplicationFormResponse = await response.json()
      if (preapproved) {
        console.log('loan preapproved!')
      } else {
        console.log('loan rejected!')
      }
    } catch (err) {
      console.log(err.statusText)
    }
  }
  const getFieldProps = (field: ApplicationFormField) => ({
    error: dirty[field] && !!warnings[field],
    helperText: dirty[field] && warnings[field],
    value: formState[field]
  })
  const isFormValid = !Object.values(warnings).some(Boolean)

  return (
    <Box display='flex' flexDirection='column' width='50%'>
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
    </Box>
  )
}

export default ApplicationForm
