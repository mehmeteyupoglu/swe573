import { TemplateResponse, TemplateType } from '@/@types/community'
import React from 'react'
import MapFields from './MapFields'

export default function MapTemplates({
    templates,
}: {
    templates: TemplateResponse[]
}) {
    return (
        <div>
            {templates.map((template) => (
                <div key={template.id}>
                    <br />
                    <h2>{template.template.name}</h2>
                    <p>{template.template.description}</p>

                    <br />
                    <h3>Fields</h3>
                    <MapFields fields={template.template.fields} />
                </div>
            ))}
        </div>
    )
}
