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
