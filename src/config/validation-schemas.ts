import { object, string } from 'zod'

export const loginSchema = object({
    email: string().email(),
    password: string().min(8, 'Password must contain at least 8 characters')
})

