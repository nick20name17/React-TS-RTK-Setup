import cn from 'classnames'
import { useNavigate } from 'react-router-dom'

import { Button } from 'components/ui/button/button'

import type { ErrorMessage } from 'types/error'

import styles from './error.module.scss'

export const Error: React.FC<ErrorMessage> = ({ message }) => {
    const classNames = cn(styles.error, 'text_center')

    const navigate = useNavigate()
    const onClick = () => navigate('/')

    return (
        <div className={classNames}>
            <h1 className='first-heading text_center'>{message}</h1>
            <Button onClick={onClick}>Go to homepage</Button>
        </div>
    )
}
