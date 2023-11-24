import { configureStore } from '@reduxjs/toolkit'

import { api } from './api'
import { listenerMiddleware } from './middleware/auth'
import authSlice from './slices/auth'

const store = configureStore({
    reducer: {
        auth: authSlice,
        [api.reducerPath]: api.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(api.middleware)
            .prepend(listenerMiddleware.middleware)
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

