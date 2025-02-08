import cn from 'classnames'
import { type FormikProps } from 'formik'
import css from './index.module.scss'

export const Select = ({
  name,
  label,
  formik,
  options,
  defaultValue,
}: {
  name: string
  label: string
  formik: FormikProps<any>
  options: JSX.Element[]
  defaultValue?: string
}): JSX.Element => {
  const disabled = formik.isSubmitting

  return (
    <div className={cn({ [css.field]: true, [css.disabled]: disabled })}>
      <label className={css.label} htmlFor={name}>
        {label}
      </label>
      <select
        className={css.select}
        name={name}
        defaultValue={defaultValue}
        onChange={(e) => {
          void formik.setFieldValue(name, e.target.value)
        }}
      >
        {/* TODO: find better way to work with empty values */}
        <option value="">Empty</option>
        {options}
      </select>
    </div>
  )
}
