import { TemplateResponse, TemplateType } from '@/@types/community'
import React, { useEffect, useState } from 'react'
import MapFields from './MapFields'
import { Select } from '@/components/ui'
import { CustomSelectOption } from '@/components/shared/CustomSelectOption'
import { CommonSelectOptionType } from '@/@types/common'

export default function MapTemplates({
    templates,
}: {
    templates: TemplateResponse[]
}) {
    const [template, setTemplate] = useState<string>('') // Change the type to string
    const [_templates, setTemplates] = useState<CommonSelectOptionType[]>([])

    useEffect(() => {
        const options = templates.map((template) => ({
            value: template.template.id?.toString() ?? '', // Convert the value to string with nullish coalescing operator
            label: template.template.name,
            id: template.template.id?.toString() ?? '', // Convert the id to string with nullish coalescing operator
        }))
        setTemplates(options)
    }, [templates])

    return (
        <div>
            <Select
                options={_templates}
                placeholder={'Templates'}
                components={{
                    Option: CustomSelectOption,
                }}
                className="mb-4 max-w-md md:w-52"
                value={
                    _templates.find((option) => option.value === template) ||
                    null
                }
                onChange={(selectedOption) => {
                    if (selectedOption) {
                        const template = (
                            selectedOption as CommonSelectOptionType
                        ).value
                        setTemplate(template) // Update the category query state
                    } else {
                        setTemplate('') // Clear the category query state
                    }
                }}
            />
        </div>
    )
}
