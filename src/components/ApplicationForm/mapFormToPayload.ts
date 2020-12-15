import { ApplicationForm, ApplicationFormData } from '../../types'

const stripSpecialChars = (str: string) => str.replace(/[^\w\s]/gi, '')

const mapFormToPayload = (form: ApplicationForm): ApplicationFormData => ({
  creditScore: Number(stripSpecialChars(form.creditScore)),
  income: Number(stripSpecialChars(form.income)),
  make: form.make,
  model: form.model,
  price: Number(stripSpecialChars(form.price))
})

export default mapFormToPayload
