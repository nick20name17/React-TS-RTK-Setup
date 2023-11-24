import cn from 'classnames'
import type { DeepMap, FieldError, FieldValues, UseFormRegister } from 'react-hook-form'

import styles from './input-group.module.scss'

type InputProps = React.InputHTMLAttributes<HTMLInputElement>

interface InputGroupProps extends InputProps {
    label: string
    errors: DeepMap<FieldValues, FieldError>
    register: UseFormRegister<any>
}

export const InputGroup: React.FC<InputGroupProps> = ({
    name,
    placeholder,
    id,
    label,
    type = 'text',
    errors,
    register,
    inputMode
}) => {
    const hasError = !!errors[id!]

    const errorMessage = hasError && <div>{errors?.[id!]?.message || 'Input error'}</div>

    const inputClass = cn(styles.input, { [styles.invalidInput]: hasError })

    return (
        <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor={id}>
                {label}
            </label>
            <input
                {...register(id!)}
                className={inputClass}
                id={id}
                type={type}
                name={name}
                placeholder={placeholder}
                inputMode={inputMode}
            />
            <div className={styles.error}>{errorMessage}</div>
        </div>
    )
}
