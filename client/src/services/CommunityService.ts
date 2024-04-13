import { CommunityFormModel } from '@/@types/community'
import ApiService from './ApiService'

export async function apiAddCommunity(data: CommunityFormModel) {
    return ApiService.fetchData({
        url: '/add_community/',
        method: 'post',
        data: {
            ...data,
            is_public: data.isPublic,
        },
    })
}

export async function apiGetDefaultTemplate() {
    return ApiService.fetchData({
        url: '/default_template/',
        method: 'get',
    })
}
