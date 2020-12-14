import { useState } from 'react'

import {
  ApplicationForm,
  ApplicationFormWarnings
} from '../types'

const validateForm = (form: ApplicationForm): ApplicationFormWarnings => ({
  creditScore: (~~form.creditScore < 300 || ~~form.creditScore > 850)
    && 'Credit Score must be between 300 and 850',
  income: !form.income && 'Estimated Yearly Income is required',
  make: !form.make && 'Make is required',
  model: !form.model && 'Model is required',
  // cannot be over 1mil, but that is flagged by "back end",
  // not input validation
  price: !form.price && 'Price is required'
})

const useApplicationForm = () => {
  const [creditScore, setCreditScore] = useState('')
  const [income, setIncome] = useState('')
  const [make, setMake] = useState('')
  const [model, setModel] = useState('')
  const [price, setPrice] = useState('')
  const [dirty, setDirty] = useState({
    creditScore: false,
    income: false,
    make: false,
    model: false,
    price: false
  })

  const formState: ApplicationForm = {
    creditScore,
    income,
    make,
    model,
    price
  }

  const warnings = validateForm(formState)


  const createSetFn = (setter: Function, field: string) => (val: any) => {
    setDirty((prev) => ({ ...prev, [field]: true }))
    setter(val)
  }

  return {
    actions: {
      setCreditScore: createSetFn(setCreditScore, 'creditScore'),
      setIncome: createSetFn(setIncome, 'income'),
      setMake: createSetFn(setMake, 'make'),
      setModel: createSetFn(setModel, 'model'),
      setPrice: createSetFn(setPrice, 'setPrice')
    },
    dirty,
    formState,
    warnings
  }
}

export default useApplicationForm