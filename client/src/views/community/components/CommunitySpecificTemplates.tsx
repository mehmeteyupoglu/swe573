import { TemplateType } from '@/@types/community'
import { Card, Button, Dialog } from '@/components/ui'
import { apiGetDefaultTemplate } from '@/services/CommunityService'
import React, { useEffect, useState } from 'react'
import { HiChevronDown } from 'react-icons/hi'
import Template from './Template'
import AddTemplateForm from './AddTemplateForm'
import { useDispatch } from 'react-redux'
import { toggleTemplateDialog } from '@/store/slices/community'
import { useAppSelector, RootState } from '@/store'

export default function CommunitySpecificTemplates() {
    const [isOpen, setIsOpen] = React.useState(false)
    const [defaultTemplate, setDefaultTemplate] = useState<TemplateType>()
    const isDialogOpen = useAppSelector(
        (state: RootState) => state.community.template.templateDialogOpen
    )

    const dispatch = useDispatch()

    useEffect(() => {
        const fetchDefaultTemplate = async () => {
            const resp = await apiGetDefaultTemplate()
            if (resp.status == 200) {
                setDefaultTemplate(resp.data as TemplateType)
            }
        }
        fetchDefaultTemplate()
    }, [])

    const onTemplateDialogOpen = () => {
        dispatch(toggleTemplateDialog())
    }

    return (
        <div>
            <Card
                className="min-w-[320px] md:min-w-[450px] mt-3"
                bodyClass="md:p-4"
            >
                <div className="flex justify-between items-center header">
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
                            </div>
                        )}
                    </div>
                )}
                <Dialog isOpen={isDialogOpen ?? false}>
                    <h5 className="mb-4">Add Template</h5>
                    <AddTemplateForm />
                </Dialog>
            </Card>
        </div>
    )
}
