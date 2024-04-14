import { TemplateType } from '@/@types/community'
import { Card, Button } from '@/components/ui'
import { apiGetDefaultTemplate } from '@/services/CommunityService'
import React, { useEffect, useState } from 'react'
import { HiChevronDown } from 'react-icons/hi'
import { toSentenceCase } from '@/utils/helpers'
import Template from './Template'

export default function CommunitySpecificTemplates() {
    const [isOpen, setIsOpen] = React.useState(false)
    const [defaultTemplate, setDefaultTemplate] = useState<TemplateType>()

    useEffect(() => {
        const fetchDefaultTemplate = async () => {
            const resp = await apiGetDefaultTemplate()
            if (resp.status == 200) {
                setDefaultTemplate(resp.data as TemplateType)
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
                <div className="flex justify-between items-center header mb-3">
                    <div
                        className="flex items-center cursor-pointer"
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
                            <HiChevronDown
                                size="30"
                                className="mr-3 transform"
                            />
                        )}
                        <div className="text-gray">
                            Community Specific Templates
                        </div>
                    </div>

                    <div className="add-template self-end">
                        <Button variant="twoTone" type="submit">
                            Add Template
                        </Button>
                    </div>
                </div>
                {isOpen && (
                    <div className="body">
                        {defaultTemplate && (
                            <Template template={defaultTemplate} />
                        )}
                    </div>
                )}
            </Card>
        </div>
    )
}
