import ApiService from './ApiService'

export async function apiSearch(query: string) {
    return ApiService.fetchData({
        url: `/search/`,
        method: 'get',
        params: {
            query,
        },
    })
}
