import { CommunityType, Field } from './community'

export type PostData = {
    id: number
    community: CommunityType
    content: ContentType
    created_at: string
    updated_at: string
    username: string
    firstname: string
    lastname: string
}

export type ContentType = {
    fields: Field[]
}
