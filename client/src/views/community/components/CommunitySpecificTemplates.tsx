import { DefaultTemplateType } from '@/@types/community'
import { Card } from '@/components/ui'
import { apiGetDefaultTemplate } from '@/services/CommunityService'
import React, { useEffect, useState } from 'react'
import { HiChevronDown } from 'react-icons/hi'
import { toSentenceCase } from '@/utils/helpers'

export default function CommunitySpecificTemplates() {
    const [isOpen, setIsOpen] = React.useState(false)
    const [defaultTemplate, setDefaultTemplate] =
        useState<DefaultTemplateType>()

    useEffect(() => {
        const fetchDefaultTemplate = async () => {
            const resp = await apiGetDefaultTemplate()
            if (resp.status == 200) {
                setDefaultTemplate(resp.data as DefaultTemplateType)
            }
        }
        fetchDefaultTemplate()
    }, [])

    return (
        <div>
            <Card
                className="min-w-[320px] md:min-w-[450px] mt-3"
                bodyClass="md:p-4"
            >
                <div
                    className="flex items-center header"
                    onClick={() => {
                        setIsOpen(!isOpen)
                    }}
                >
                    {isOpen ? (
                        <HiChevronDown
                            size="30"
                            className="mr-3 transform rotate-180"
                        />
                    ) : (
                        <HiChevronDown size="30" className="mr-3 transform" />
                    )}
                    <div className="">Community Specific Templates</div>
                </div>
                {isOpen && (
                    <div className="body">
                        <Card bordered>
                            <div className="text-slate-100 font-bold">
                                Default Template:
                            </div>
                            <div className="flex underline text-slate-200 font-bold mt-2">
                                <div className="mr-2 w-1/6">Field Name</div>
                                <div>Field Type</div>
                            </div>
                            {defaultTemplate?.fields.map((field, index) => (
                                <div key={index} className="flex">
                                    <div className="mr-2 w-1/6">
                                        {toSentenceCase(field.field_name)}
                                    </div>
                                    <div>
                                        {toSentenceCase(field.field_type)}
                                    </div>
                                </div>
                            ))}
                        </Card>
                    </div>
                )}
            </Card>
        </div>
    )
}
