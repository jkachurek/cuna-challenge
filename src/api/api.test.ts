import * as api from './index'
import { ApplicationFormData } from '../types'


const mockAppForm: ApplicationFormData = {
  creditScore: 750,
  income: 150000,
  make: 'Volkswagen',
  model: 'GTI',
  price: 30000
}

describe('mock API service', () => {
  describe('submitApplication method', () => {
    test('returns approval when credit score & loan-to-income ratio are good', async () => {
      const response = await api.submitApplication(mockAppForm)
      expect(response).toHaveProperty('status', 200)
      const data = await response.json()
      expect(data).toHaveProperty('preapproved', true)
    })
    test('returns rejection when credit score or loan-to-income ratio is bad', async () => {
      const badCredit: ApplicationFormData = {
        ...mockAppForm,
        creditScore: 400
      }
      const creditRes = await api.submitApplication(badCredit)
      const creditData = await creditRes.json()
      expect(creditData).toHaveProperty('preapproved', false)

      const tooPricey: ApplicationFormData = {
        ...mockAppForm,
        price: 50000
      }
      const priceyRes = await api.submitApplication(tooPricey)
      const priceyData = await priceyRes.json()
      expect(priceyData).toHaveProperty('preapproved', false)
    })
    test('returns 400 if price is too high', async () => {
      const formData = {
        ...mockAppForm,
        price: 1500000
      }
      expect.assertions(1)

      await expect(api.submitApplication(formData))
        .rejects.toHaveProperty('status', 400)
    })
  })
  test.todo('createAccount method returns 200')
})
