import ApiService from './ApiService'
import type {
    UserType,
    PasswordType,
    UserMealLikeType,
    UserOwnsType,
} from '@/@types/user'

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

export async function userMealLike(data: UserMealLikeType) {
    const { mealId, userId, isLiked } = data
    return ApiService.fetchData({
        url: `/users/${userId}/likes/${mealId}`,
        method: isLiked ? 'delete' : 'post',
    })
}

export async function userOwnsIngredient(data: UserOwnsType) {
    const { id, userId, userOwns } = data
    // id => ingredient id
    return ApiService.fetchData({
        url: `/users/${userId}/ingredients/${id}`,
        method: userOwns ? 'delete' : 'post',
    })
}
