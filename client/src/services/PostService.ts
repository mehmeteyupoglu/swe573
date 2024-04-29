import ApiService from './ApiService'

export async function apiPost(
    communityId: string,
    userId: string,
    fields: string
) {
    return ApiService.fetchData({
        url: `/post/`,
        method: 'post',
        data: {
            community_id: communityId,
            user_id: userId,
            content: fields,
        },
    })
}

export async function apiGetPosts() {
    return ApiService.fetchData({
        url: '/posts/',
        method: 'get',
    })
}
