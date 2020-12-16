export type ApplicationFormField = 'creditScore' | 'income' | 'make' | 'model' | 'price'
export type ValidationWarning = string | false

/**
 * All strings to work better with UI, gets converted to appropriate
 * types before submission as ApplicationFormData
 */
export interface ApplicationForm {
  price: string
  make: string
  model: string
  income: string
  creditScore: string
}

export interface ApplicationFormWarnings {
  price: ValidationWarning
  make: ValidationWarning
  model: ValidationWarning
  income: ValidationWarning
  creditScore: ValidationWarning
}

/**
 * Form data that gets sent to the API
 */
export interface ApplicationFormData {
  price: number
  make: string
  model: string
  income: number
  creditScore: number
}

export interface ApplicationFormResponse {
  preapproved: boolean
}

export interface NewAccountForm {
  password: string
  passwordConfirm: string
  username: string
}

export interface NewAccountFormWarnings {
  password: ValidationWarning
  passwordConfirm: ValidationWarning
  username: ValidationWarning
}
