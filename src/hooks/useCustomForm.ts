import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import type { ZodType } from 'zod'

export const useCustomForm = <T extends {}>(schema: ZodType<T, any, any>) => {
    const {
        register,
        formState: { errors },
        handleSubmit,

        reset
    } = useForm<T>({
        mode: 'onBlur',
        resolver: zodResolver(schema)
    })
    return {
        errors,
        register,
        handleSubmit,
        reset
    }
}

