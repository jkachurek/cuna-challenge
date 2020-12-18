import { ChangeEvent, useState } from 'react'

type ValueMap<T extends string> = { [K in T]?: string }
type BoolMap<T extends string> = { [K in T]?: boolean }
type ValidatorFn = (val: string) => boolean
type ValidatorMap<T extends string> = { [K in T]: ValidatorFn }

const useForm = <T extends string>(fields: T[], validators: ValidatorMap<T>) => {
  const [values, setValues] = useState(fields.reduce(
    (acc: ValueMap<T>, f) => {
      acc[f] = ''
      return acc
    }, {})
  )
  const [valid, setValid] = useState(fields.reduce(
    (acc: BoolMap<T>, f) => {
      // default to true so form only shows errors once it is touched
      acc[f] = true
      return acc
    }, {})
  )

  const getFieldProps = (name: T) => ({
    error: !valid[name],
    name,
    onChange: (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target
      setValues({ ...values, [name]: value })
      setValid({ ...valid, [name]: validators[name](value) })
    },
    // ideally this would be in the overrides of a custom MUI theme,
    // but it's not quite worth it to make a whole custom theme just for that.
    variant: 'outlined'
  })

  return {
    getFieldProps,
    valid,
    values
  }
}

export default useForm
