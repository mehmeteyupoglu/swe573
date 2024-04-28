import { CommunityType } from './community'

export type PostData = {
    id: number
    community: CommunityType
    content: string
    created_at: string
    updated_at: string
    username: string
    firstname: string
    lastname: string
}
