import { TemplateResponse, TemplateType } from '@/@types/community'
import React, { useEffect } from 'react'
import MapFields from './MapFields'
import { Select } from '@/components/ui'
import { CustomSelectOption } from '@/components/shared/CustomSelectOption'
import { CommonSelectOptionType } from '@/@types/common'

export default function MapTemplates({
    templates,
}: {
    templates: TemplateResponse[]
}) {
    const [template, setTemplate] = React.useState<string>('')
    const [_templates, setTemplates] = React.useState<CommonSelectOptionType[]>(
        []
    )

    React.useEffect(() => {
        const mapTemplates = templates.map((template) => ({
            value: template.template.name,
            label: template.template.name,
            id: template.id.toString(), // Convert the id to string
        }))
        setTemplates(mapTemplates)
    }, [templates])

    useEffect(() => {
        console.log('Template:', template)
    }, [template])

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

            <Select
                options={_templates}
                placeholder={'Templates'}
                components={{
                    Option: CustomSelectOption,
                }}
                className="mb-4 max-w-md md:w-52"
                value={
                    _templates.find((option) => option.id === template) || null
                }
                onChange={(selectedOption) => {
                    if (selectedOption) {
                        const value = (selectedOption as CommonSelectOptionType)
                            .id
                        setTemplate(value) // Update the category query state
                    } else {
                        setTemplate('') // Clear the category query state
                    }
                }}
            />
        </div>
    )
}
