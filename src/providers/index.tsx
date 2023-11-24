import { PropsWithChildren } from 'react'
import { Provider } from 'react-redux'

import store from 'store/index'

import { AuthProvider } from './auth-provider'

export const Providers: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <Provider store={store}>
            <AuthProvider>{children}</AuthProvider>
        </Provider>
    )
}
