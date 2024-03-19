export type SignInCredential = {
    username: string
    password: string
}

export type SignInResponse = {
    token: string
    user: {
        id: number
        avatar: string
        firstName: string
        lastName: string
        phone: string
        username: string
        email: string
        verified: boolean
        authority: string[]
        created_at: string
        updated_at: string
    }
}

export type SignUpResponse = SignInResponse

export type SignUpCredential = {
    username: string
    email: string
    password: string
}

export type ForgotPassword = {
    email: string
}

export type ResetPassword = {
    password: string
}
