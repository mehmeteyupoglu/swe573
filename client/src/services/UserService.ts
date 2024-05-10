import ApiService from './ApiService'
import type { UserType, PasswordType } from '@/@types/user'

export async function getUsers() {
    return ApiService.fetchData({
        url: `/users`,
        method: 'get',
    })
}

export async function updateProfile(data: UserType) {
    const { id, authority, avatar, ..._data } = data
    authority
    avatar
    return ApiService.fetchData({
        url: `/users/${id}`,
        method: 'put',
        data: _data,
    })
}

export async function updatePassword(data: PasswordType) {
    return ApiService.fetchData({
        url: `/update-password`,
        method: 'put',
        data,
    })
}

export async function apiGetInvitations(userId: string) {
    return ApiService.fetchData({
        url: `/user/${userId}/invitations/`,
        method: 'get',
    })
}
export async function apiGetUserCommunities(userId: string) {
    return ApiService.fetchData({
        url: `/user/${userId}/communities/`,
        method: 'get',
    })
}

export async function apiAcceptRejectInvitation(
    invitationId: string,
    status: number
) {
    return ApiService.fetchData({
        url: `/user/${invitationId}/accept_reject_invitation/`,
        method: 'post',
        data: {
            action: status,
        },
    })
}

export async function apiGetUserInformation(userId: string) {
    return ApiService.fetchData({
        url: `/users/${userId}/`,
        method: 'get',
    })
}
