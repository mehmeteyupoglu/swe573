import { Field, TemplateResponse, TemplateType } from '@/@types/community'
import React from 'react'

export default function MapFields({ fields }: { fields: Field[] }) {
    return (
        <div>
            {fields.map((field) => (
                <div key={field.field_name}>
                    <h3>{field.field_name}</h3>
                    <p>{field.field_type}</p>
                </div>
            ))}
        </div>
    )
}
