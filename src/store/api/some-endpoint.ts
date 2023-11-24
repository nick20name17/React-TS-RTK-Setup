import { api } from '.'

interface SomeEndpointResponse {
    data: string[]
}

interface SomeEndpointData {
    data: string[]
}

interface QueryParams {
    param: string
}

export const someEndpoint = api.injectEndpoints({
    endpoints: (build) => ({
        getSomeEndpoints: build.query<SomeEndpointResponse, QueryParams>({
            query: ({ param }) => `some?${param}`,
            providesTags: ['SomeEndpoint']
        }),
        getSomeEndpoint: build.query<SomeEndpointResponse, number>({
            query: (id) => `some/${id}/`,
            providesTags: ['SomeEndpoint']
        }),
        addSomeEndpoint: build.mutation<void, SomeEndpointData>({
            query: (data) => ({
                url: `some/`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['SomeEndpoint']
        }),
        patchSomeEndpoint: build.mutation<void, SomeEndpointData>({
            query: ({ data }) => ({
                url: 'some/',
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ['SomeEndpoint']
        }),
        removeSomeEndpoint: build.mutation<void, number>({
            query: (id) => ({
                url: `some/${id}/`,
                method: 'DELETE'
            }),
            invalidatesTags: ['SomeEndpoint']
        })
    })
})

export const {
    useGetSomeEndpointsQuery,
    useGetSomeEndpointQuery,
    useAddSomeEndpointMutation,
    usePatchSomeEndpointMutation,
    useRemoveSomeEndpointMutation
} = someEndpoint
