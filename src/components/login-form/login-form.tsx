import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import type { infer as zodInfer } from 'zod'

import { Button } from 'components/ui/button/button'
import { CheckboxGroup } from 'components/ui/checkbox-group/checkbox-group'
import { InputGroup } from 'components/ui/input-group/input-group'
import { Loader } from 'components/ui/loader/loader'

import { loginSchema } from 'config/validation-schemas'

import { useCustomForm } from 'hooks/useCustomForm'

import { useLoginMutation } from 'store/api'

import { isErrorWithMessage } from 'utils/is-error-with-message'

import styles from './login-form.module.scss'

type FormData = zodInfer<typeof loginSchema>

export const LoginForm = () => {
    const [error, setError] = useState<string>('')
    const [rememberMe, setRememberMe] = useState<boolean>(false)

    if (rememberMe) {
        localStorage.setItem('rememberMe', JSON.stringify({ rememberMe: true }))
    } else {
        localStorage.removeItem('rememberMe')
    }

    const onRememberMe = () => {
        setRememberMe((prev) => !prev)
    }

    const navigate = useNavigate()

    const { handleSubmit, register, errors } = useCustomForm<FormData>(loginSchema)

    const [login, { isLoading }] = useLoginMutation()

    const handleLogin = async (data: FormData) => {
        try {
            await login(data).unwrap()
            if (!rememberMe) {
                sessionStorage.setItem('rememberMe', JSON.stringify({ rememberMe: true }))
            }
            navigate('/')
        } catch (error) {
            const maybeError = isErrorWithMessage(error)
            if (maybeError) {
                setError(error?.data.detail)
            } else {
                setError('Unknown error')
            }
        }
    }

    const onSubmit: SubmitHandler<FormData> = (formData) => {
        handleLogin(formData)
        setError('')
    }

    return (
        <div className={`border radius_300 ${styles.body}`}>
            <h2 className='text_fz-600 '>Login</h2>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className={styles.form}
                method='post'
                noValidate>
                <div className={styles.inputs}>
                    <InputGroup
                        register={register}
                        errors={errors}
                        label='Email'
                        name='email'
                        id='email'
                        type='email'
                        placeholder='Enter your email'
                        inputMode='email'
                    />
                    <InputGroup
                        register={register}
                        errors={errors}
                        label='Password'
                        name='password'
                        id='password'
                        type='password'
                        placeholder='••••••••••'
                        inputMode='email'
                    />
                    <div className={styles.options}>
                        <CheckboxGroup
                            onClick={onRememberMe}
                            label='Remember me'
                            name='remember-me'
                            id='remember-me'
                        />
                        <Link
                            className={`text_dark-300 text_fz-300 text_medium ${styles.link}`}
                            to='/'>
                            Forgot password?
                        </Link>
                    </div>
                    <Button>{isLoading ? <Loader variant='light' /> : 'Continue'}</Button>
                </div>
                {error ? (
                    <div className={`text_danger text_center ${styles.error}`}>
                        {error}
                    </div>
                ) : (
                    ''
                )}
            </form>
        </div>
    )
}
