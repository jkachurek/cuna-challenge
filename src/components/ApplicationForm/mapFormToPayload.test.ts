import mapFormToPayload from './mapFormToPayload'

describe('mapFormToPayload method', () => {
  test('converts form fields to appropriate types for payload', () => {
    const payload = mapFormToPayload({
      creditScore: '800',
      income: '$100,000',
      make: 'Volkswagen',
      model: 'GTI',
      price: '$30,000'
    })
    const expected = {
      creditScore: 800,
      income: 100000,
      make: 'Volkswagen',
      model: 'GTI',
      price: 30000
    }
    expect(payload).toEqual(expected)
  })
})
