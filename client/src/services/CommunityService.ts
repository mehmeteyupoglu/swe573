import { CommunityFormModel } from '@/@types/community'
import ApiService from './ApiService'

export async function apiAddCommunity(data: CommunityFormModel) {
    const { isPublic, userId, ...rest } = data
    return ApiService.fetchData({
        url: '/add_community/',
        method: 'post',
        data: {
            ...rest,
            is_public: isPublic,
            user_id: userId,
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

export async function apiGetCommunityList(userId: { userId: string }) {
    return ApiService.fetchData({
        url: '/communities/',
        method: 'get',
        params: {
            user_id: userId,
        },
    })
}

export async function apiGetCommunity(id: string, userId: string) {
    return ApiService.fetchData({
        url: `/community/${id}/`,
        method: 'get',
        params: {
            user_id: userId,
        },
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

export async function apiFetchMembers(communityId: string) {
    return ApiService.fetchData({
        url: `/community/${communityId}/members`,
        method: 'get',
    })
}

export async function apiChangeUserRole(
    communityId: string,
    userId: string,
    role: number
) {
    return ApiService.fetchData({
        url: `/change_user_role/${communityId}/${userId}/`,
        method: 'post',
        data: {
            role,
        },
    })
}

export async function apiGetUserRole(communityId: string, userId: string) {
    return ApiService.fetchData({
        url: `/community/${communityId}/role/`,
        method: 'get',
        params: {
            user_id: userId,
        },
    })
}

export async function apiGetJoinRequests(communityId: string) {
    return ApiService.fetchData({
        url: `/community/${communityId}/join_requests/`,
        method: 'get',
    })
}

export async function apiAcceptRejectRequest(
    requestId: string,
    status: number
) {
    return ApiService.fetchData({
        url: `/community/${requestId}/accept_reject_join_request/`,
        method: 'post',
        data: {
            action: status,
        },
    })
}
