import { act, renderHook } from '@testing-library/react-hooks'
import { ChangeEvent } from 'react'

import useForm from './useForm'

const mockFields = [
  'name',
  'address',
  'city',
  'state'
]
const createMockValidator = () => jest.fn()
  .mockImplementation(val => !!val)
const mockValidatorMap = {
  name: (val: string) => !!val,
  address: (val: string) => !!val,
  city: (val: string) => !!val,
  state: (val: string) => !!val
}

describe('useForm hook', () => {
  test('returns a map of field values', () => {
    const { result } = renderHook(() => useForm(mockFields, mockValidatorMap))
    expect(result.current.values).toEqual({
      name: '',
      address: '',
      city: '',
      state: ''
    })
  })
  test('returns a map of field validity that is initially true', () => {
    const { result } = renderHook(() => useForm(mockFields, mockValidatorMap))
    expect(result.current.valid).toEqual({
      name: true,
      address: true,
      city: true,
      state: true
    })
  })
  describe('returned getFieldProps method', () => {
    test('returns expected error, name, and variant props', () => {
      const { result } = renderHook(() => useForm(mockFields, mockValidatorMap))
      const props = result.current.getFieldProps('address')
      expect(props).toMatchObject({
        error: false,
        name: 'address',
        variant: 'outlined'
      })
    })
    test('returned onChange method updates field value & validity', () => {
      const { result } = renderHook(() => useForm(mockFields, mockValidatorMap))
      act(() => {
        const { onChange } = result.current.getFieldProps('address')
        onChange({ target: { value: 'mock address' } } as ChangeEvent<HTMLInputElement>)
      })
      expect(result.current.valid['address']).toBe(true)
      expect(result.current.values['address']).toEqual('mock address')

      // check that the validator actually runs
      act(() => {
        const { onChange } = result.current.getFieldProps('address')
        onChange({ target: { value: '' } } as ChangeEvent<HTMLInputElement>)
      })
      expect(result.current.valid['address']).toBe(false)
      expect(result.current.values['address']).toEqual('')
    })
  })
})