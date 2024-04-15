import { CommunityFormModel } from '@/@types/community'
import ApiService from './ApiService'

export async function apiAddCommunity(data: CommunityFormModel) {
    const { isPublic, ...rest } = data
    return ApiService.fetchData({
        url: '/add_community/',
        method: 'post',
        data: {
            ...rest,
            is_public: isPublic,
        },
    })
}

export async function apiGetDefaultTemplate() {
    return ApiService.fetchData({
        url: '/default_template/',
        method: 'get',
    })
}

export async function apiGetDataTypes() {
    return ApiService.fetchData({
        url: '/data_types/',
        method: 'get',
    })
}

export async function apiGetCommunityList() {
    return ApiService.fetchData({
        url: '/communities/',
        method: 'get',
    })
}

export async function apiGetCommunity(id: string) {
    return ApiService.fetchData({
        url: `/community/${id}/`,
        method: 'get',
    })
}

export async function apiJoinCommunity(communityId: string, userId: string) {
    return ApiService.fetchData({
        url: `/join_community/${communityId}/${userId}/`,
        method: 'post',
    })
}

export async function apiIsUserInCommunity(
    communityId: string,
    userId: string
) {
    return ApiService.fetchData({
        url: `/is_user_in_community/${communityId}/${userId}/`,
        method: 'get',
    })
}

export async function apiLeaveCommunity(communityId: string, userId: string) {
    return ApiService.fetchData({
        url: `/leave_community/${communityId}/${userId}/`,
        method: 'post',
    })
}
