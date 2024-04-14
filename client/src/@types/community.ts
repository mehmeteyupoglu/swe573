export type CommunityFormModel = {
    name: string
    description: string
    avatar: string
    isPublic: boolean
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
