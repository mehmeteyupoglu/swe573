export type UserType = {
    id: string
    username: string
    firstName: string
    lastName: string
    email: string
    phone: string
    gender: string
    avatar: string
    verified: number
    subscription: string
    authority: []
}
export type PasswordType = {
    userId: string
    newPassword: string
}

export type UserMealLikeType = {
    mealId: number
    userId: number
    isLiked: boolean
}

export type UserOwnsType = {
    id: number
    userId: number
    userOwns?: boolean
}
