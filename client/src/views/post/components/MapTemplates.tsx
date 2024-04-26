import { TemplateResponse, TemplateType } from '@/@types/community'
import React from 'react'

export default function MapTemplates({
    templates,
}: {
    templates: TemplateResponse[]
}) {
    return (
        <div>
            {templates.map((template) => (
                <div key={template.id}>
                    <h1>{template.template.id}</h1>
                    <h2>{template.template.name}</h2>
                    <p>{template.template.description}</p>
                    {template.template.fields.map((field) => (
                        <div key={field.field_name}>
                            <h3>{field.field_name}</h3>
                            <p>{field.field_type}</p>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}
