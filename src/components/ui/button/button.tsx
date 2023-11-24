import cn from 'classnames'

import styles from './button.module.scss'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon?: React.ReactNode
}

export const Button: React.FC<Props> = ({ children, icon = '', ...attrs }) => {
    const btnClasses = cn(styles.btn, { [styles.btn_icon]: icon })

    return (
        <button className={btnClasses} {...attrs}>
            {icon}
            {children}
        </button>
    )
}
