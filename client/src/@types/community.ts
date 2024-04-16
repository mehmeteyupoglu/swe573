export type CommunityFormModel = {
    name: string
    description: string
    avatar: string
    isPublic: boolean
    userId?: string
}

export type TemplateType = {
    id?: number
    name: string
    description: string
    created_at?: string
    updated_at?: string
    fields: [
        {
            field_name: string
            field_type: string
        }
    ]
    templateDialogOpen?: boolean
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

type Member = {
    id: number
    firstname: string
    lastname: string
    username: string
    email: string
    dob: string | null
    country: string
    phone: string
    short_bio: string | null
}

export type IndividualCommunityType = {
    id: number
    name: string
    description: string
    created_at: string
    updated_at: string
    is_public: boolean
    is_member: boolean
    has_user_requested: boolean
    reputation_rating: string
    templates: DataTypeOption[]
    num_members: number
    members?: Member[]
}

export type FetchCommunityType = {
    fetchTrigger: boolean
}
