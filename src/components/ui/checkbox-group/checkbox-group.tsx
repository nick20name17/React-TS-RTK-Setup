import styles from './checkbox-group.module.scss'

type InputProps = React.InputHTMLAttributes<HTMLInputElement>

interface InputGroupProps extends InputProps {
    label: string
}

export const CheckboxGroup: React.FC<InputGroupProps> = ({
    name,
    id,
    label,
    ...attrs
}) => {
    return (
        <div className={styles.inputGroup}>
            <input
                className={styles.checkbox}
                id={id}
                type='checkbox'
                name={name}
                {...attrs}
            />
            <label className={styles.label} htmlFor={id}>
                {label}
            </label>
        </div>
    )
}

