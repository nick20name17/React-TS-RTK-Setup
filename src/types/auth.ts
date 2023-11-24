export interface LoginData {
    email: string
    password: string
}

interface User {
    id: number
    email: string
}

export interface LoginResponse {
    refresh: string | null
    access: string | null
    user: User | null
}

export interface RefreshResponse {
    data: {
        access: string
    }
}

export interface AccessToken {
    access: string
}

export interface RefreshToken {
    refresh: string
}
