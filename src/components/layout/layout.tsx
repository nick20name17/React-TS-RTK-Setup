import { ErrorBoundary } from 'react-error-boundary'
import { Outlet } from 'react-router-dom'

import { Head } from 'components/head/head'

import ErrorPage from 'pages/error-page'

export const Layout = () => {
    return (
        <>
            <Head />
            <main>
                <ErrorBoundary fallback={<ErrorPage message='Something went wrong' />}>
                    <Outlet />
                </ErrorBoundary>
            </main>
        </>
    )
}
