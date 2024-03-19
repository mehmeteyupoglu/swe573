import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SLICE_BASE_NAME } from './constants'

interface UserState {
    id: number
    avatar: string
    firstName: string
    lastName: string
    phone: string
    username: string
    email: string
    verified: boolean
    authority: string[]
}

const initialState: UserState = {
    id: -1,
    avatar: '',
    firstName: '',
    lastName: '',
    phone: '',
    username: '',
    email: '',
    verified: false,
    authority: [],
}

const userSlice = createSlice({
    name: `${SLICE_BASE_NAME}/user`,
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<UserState>) {
            // Use immer's draft syntax to modify the state
            Object.assign(state, action.payload)
        },
    },
})

export const { setUser } = userSlice.actions
export default userSlice.reducer
