import { CommunityType } from './community'
import { UserResponseType } from './user'

export type PostData = {
    id: number
    community: CommunityType
    content: _Field[]
    created_at: string
    updated_at: string
    username?: string
    firstname?: string
    lastname?: string
    user: UserResponseType
    likes?: number
}

export type _Field = {
    field_name: string
    field_type: string
    field_value: string
}
