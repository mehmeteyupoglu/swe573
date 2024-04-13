export type CommunityFormModel = {
    name: string
    description: string
    avatar: string
    isPublic: boolean
}

export type TemplateType = {
    id: number
    name: string
    description: string
    created_at: string
    updated_at: string
    fields: [
        {
            field_name: string
            field_type: string
        }
    ]
}
