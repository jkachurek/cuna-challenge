import { Box, Button, InputAdornment, TextField } from '@material-ui/core'
import React from 'react'

import useApplicationForm from '../../hooks/useApplicationForm'

// consider switching to using react-text-mask or react-number-format to do masking
const UsdAdornment = <InputAdornment position='start'>$</InputAdornment>

const ApplicationForm: React.FunctionComponent = () => {
  const {
    formState,
    setCreditScore,
    setIncome,
    setMake,
    setModel,
    setPrice,
    warnings
  } = useApplicationForm()

  return (
    <Box display='flex' flexDirection='column' width='50%'>
      <TextField
        error={!!warnings.price}
        helperText={warnings.price}
        InputProps={{
          startAdornment: UsdAdornment
        }}
        label='Purchase Price'
        onChange={e => setPrice(e.target.value)}
        type='number'
        value={formState.price}
      />
      <TextField
        error={!!warnings.make}
        helperText={warnings.make}
        InputLabelProps={{ shrink: true }}
        label='Auto Make'
        onChange={e => setMake(e.target.value)}
        type='text'
        value={formState.make}
      />
      <TextField
        error={!!warnings.model}
        helperText={warnings.model}
        InputLabelProps={{ shrink: true }}
        label='Auto Model'
        onChange={e => setModel(e.target.value)}
        type='text'
        value={formState.model}
      />
      <TextField
        error={!!warnings.income}
        helperText={warnings.income}
        InputProps={{
          startAdornment: UsdAdornment
        }}
        label='Estimated Yearly Income'
        onChange={e => setIncome(e.target.value)}
        type='number'
        value={formState.income}
      />
      <TextField
        error={!!warnings.creditScore}
        helperText={warnings.creditScore}
        InputLabelProps={{ shrink: true }}
        label='Estimated Credit Score'
        onChange={e => setCreditScore(e.target.value)}
        type='number'
        value={formState.creditScore}
      />
      <Button
        onClick={() => {}}
        size='large'
      >
        Submit
      </Button>
    </Box>
  )
}

export default ApplicationForm
