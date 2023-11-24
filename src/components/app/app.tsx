import { Suspense, lazy } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import 'assets/styles/index.scss'

import { Layout } from 'components/layout/layout'
import { Loader } from 'components/ui/loader/loader'

import { routes } from 'config/routes'

import { RequireAuthProvider } from 'providers/require-auth-provider'

const HomePage = lazy(() => import('pages/home-page'))
const LoginPage = lazy(() => import('pages/login-page'))
const SomePrivatePage = lazy(() => import('pages/some-private-page'))
const ErrorPage = lazy(() => import('pages/error-page'))

const router = createBrowserRouter([
    {
        path: routes.home,
        element: <Layout />,
        errorElement: <ErrorPage message='This page doest not found' />,
        children: [
            {
                index: true,
                element: (
                    <Suspense fallback={<Loader />}>
                        <HomePage />
                    </Suspense>
                )
            },
            {
                path: routes.login,
                element: (
                    <Suspense fallback={<Loader />}>
                        <LoginPage />
                    </Suspense>
                )
            },
            {
                path: routes.somePrivatePage,
                element: (
                    <Suspense fallback={<Loader />}>
                        <RequireAuthProvider>
                            <SomePrivatePage />
                        </RequireAuthProvider>
                    </Suspense>
                )
            }
        ]
    },
    {
        path: '*',
        element: (
            <Suspense fallback={<Loader />}>
                <ErrorPage message='This page doest not found' />
            </Suspense>
        )
    }
])

export const App = () => <RouterProvider router={router} />
