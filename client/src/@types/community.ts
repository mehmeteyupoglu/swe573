export type CommunityFormModel = {
    name: string
    description: string
    avatar: string
    isPublic: boolean
    userId?: string
}

export type Field = {
    field_name: string
    field_type: string
}

export type TemplateType = {
    id?: number
    name: string
    description: string
    created_at?: string
    updated_at?: string
    fields: Field[]
    templateDialogOpen?: boolean
}

export type TemplateResponse = {
    template: TemplateType
    id: number
}

export interface DataTypeResponse {
    data_types: (
        | 'Text'
        | 'Date'
        | 'Geolocation'
        | 'Number'
        | 'Image'
        | 'Video'
        | 'Audio'
        | 'File'
    )[]
}

export type DataTypeOption = {
    value: string
    label: string
}

export type CommunityType = {
    id: number
    name: string
    description: string
    created_at: string
    updated_at: string
    is_public: boolean
    reputation_rating: string
    templates: DataTypeOption[]
    members: Member[]
}

export type Member = {
    id: number
    firstname: string
    lastname: string
    username: string
    email: string
    dob: string | null
    country: string
    phone: string
    short_bio: string | null
    role?: number
    joined_at?: string
}

export type IndividualCommunityType = {
    id: number
    name: string
    description: string
    created_at: string
    updated_at: string
    is_public: boolean
    is_member: boolean
    is_owner: boolean
    has_user_requested: boolean
    reputation_rating: string
    templates: DataTypeOption[]
    num_members: number
    members?: Member[]
}

export type FetchCommunityType = {
    fetchTrigger: boolean
}

export type JoinRequest = {
    id: number
    firstname: string
    lastname: string
    username: string
    created_at?: string
    updated_at?: string
    status: boolean
}

export type Invitations = {
    id: number
    community_name: string
    created_at?: string
    updated_at?: string
    status: boolean
}
