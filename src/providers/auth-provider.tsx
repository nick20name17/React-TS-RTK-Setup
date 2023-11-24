import { PropsWithChildren } from 'react'

import { Loader } from 'components/ui/loader/loader'

import { useGetSomeEndpointsQuery } from 'store/api/some-endpoint'

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
    // use for relogin
    const { isLoading } = useGetSomeEndpointsQuery({ param: '' })

    if (isLoading) {
        return <Loader />
    }

    return children
}
