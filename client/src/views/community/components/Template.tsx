import React from 'react'
import { Card } from '@/components/ui'
import { toSentenceCase } from '@/utils/helpers'
import { TemplateType } from '@/@types/community'

export default function Template({ template }: { template: TemplateType }) {
    return (
        <Card bordered className="mt-5">
            <div className="text-gray font-bold">{template.name}:</div>
            <div className="flex underline text-gray font-bold mt-2">
                <div className="mr-2 w-1/6">Field Name</div>
                <div>Field Type</div>
            </div>
            {template?.fields.map((field, index) => (
                <div key={index} className="flex">
                    <div className="mr-2 w-1/6">
                        {toSentenceCase(field.field_name)}
                    </div>
                    <div>{toSentenceCase(field.field_type)}</div>
                </div>
            ))}
        </Card>
    )
}
