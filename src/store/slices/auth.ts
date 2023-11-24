import { createSlice } from '@reduxjs/toolkit'

import { api } from 'store/api'

import type { LoginResponse } from 'types/auth'

interface IAuthState extends LoginResponse {
    isAuth: boolean
}

const initialState: IAuthState = {
    user: null,
    access: null,
    refresh: null,
    isAuth: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: () => {
            localStorage.clear()
            sessionStorage.clear()
            return initialState
        },
        tokenUpdated: (state, action) => {
            if (state.user) {
                state.access = action.payload.access
            }
        }
    },
    extraReducers: (build) => {
        build.addMatcher(api.endpoints.login.matchFulfilled, (state, action) => {
            const { access, user } = action.payload
            state.access = access
            state.user = user
            state.isAuth = true
        })
        // use for auto-relogin
        // .addMatcher(
        //     someEndpoint.endpoints.getSomeEndpoint.matchFulfilled,
        //     (state) => {
        //         state.isAuth = true
        //     }
        // )
    }
})

export default authSlice.reducer
export const { logout, tokenUpdated } = authSlice.actions
