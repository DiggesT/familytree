import classNames from 'classnames'
import { type FormikProps } from 'formik'
import css from './index.module.scss'

export const Textarea = ({ name, label, formik }: { name: string; label: string; formik: FormikProps<any> }) => {
  const value = formik.values[name]
  const disabled = formik.isSubmitting

  return (
    <div className={classNames({ [css.field]: true, [css.disabled]: disabled })}>
      <label className={css.label} htmlFor={name}>
        {label}
      </label>
      <textarea
        className={css.input}
        onChange={(e) => {
          void formik.setFieldValue(name, e.target.value)
        }}
        value={value}
        name={name}
        id={name}
        disabled={formik.isSubmitting}
      />
    </div>
  )
}
