import { TemplateType } from '@/@types/community'
import { Card, Button, Dialog } from '@/components/ui'
import { apiGetDefaultTemplate } from '@/services/CommunityService'
import React, { useEffect, useState } from 'react'
import { HiChevronDown } from 'react-icons/hi'
import { toSentenceCase } from '@/utils/helpers'
import Template from './Template'
import AddTemplateForm from './AddTemplateForm'

export default function CommunitySpecificTemplates() {
    const [isOpen, setIsOpen] = React.useState(false)
    const [defaultTemplate, setDefaultTemplate] = useState<TemplateType>()
    const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false)

    useEffect(() => {
        const fetchDefaultTemplate = async () => {
            const resp = await apiGetDefaultTemplate()
            if (resp.status == 200) {
                setDefaultTemplate(resp.data as TemplateType)
            }
        }
        fetchDefaultTemplate()
    }, [])

    const onTemplateDialogClose = () => {
        setIsTemplateDialogOpen(false)
    }

    const onTemplateDialogOpen = () => {
        setIsTemplateDialogOpen(true)
    }

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
                        <Button
                            variant="twoTone"
                            type="submit"
                            onClick={onTemplateDialogOpen}
                        >
                            Add Template
                        </Button>
                    </div>
                </div>
                {isOpen && (
                    <div className="body">
                        {defaultTemplate && (
                            <div>
                                <Template template={defaultTemplate} />
                                <Template template={defaultTemplate} />
                                <Template template={defaultTemplate} />
                            </div>
                        )}
                    </div>
                )}
                <Dialog
                    isOpen={isTemplateDialogOpen}
                    onClose={onTemplateDialogClose}
                >
                    <h5 className="mb-4">Add Template</h5>
                    <AddTemplateForm />
                    <div className="flex flex-col">
                        <div className="flex justify-end">
                            <Button
                                variant="solid"
                                type="submit"
                                onClick={onTemplateDialogClose}
                            >
                                Save
                            </Button>
                        </div>
                    </div>
                </Dialog>
            </Card>
        </div>
    )
}
