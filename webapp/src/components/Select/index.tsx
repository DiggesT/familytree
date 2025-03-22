import cn from 'classnames'
import css from './index.module.scss'

export const Select = ({
  name,
  label,
  disabled = false,
  options,
  defaultValue,
  onChange,
}: {
  name: string
  label: string
  disabled: boolean
  options: JSX.Element[]
  defaultValue?: string
  onChange?: (e: any) => void
}): JSX.Element => {
  return (
    <div className={cn({ [css.field]: true, [css.disabled]: disabled })}>
      <label className={css.label} htmlFor={name}>
        {label}
      </label>
      <select className={css.select} name={name} defaultValue={defaultValue} onChange={onChange}>
        {/* TODO: find better way to work with empty values */}
        <option value="">Empty</option>
        {options}
      </select>
    </div>
  )
}
