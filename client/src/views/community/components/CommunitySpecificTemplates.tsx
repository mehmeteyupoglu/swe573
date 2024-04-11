import { Card } from '@/components/ui'
import React from 'react'
import { HiChevronDown } from 'react-icons/hi'

export default function CommunitySpecificTemplates() {
    const [isOpen, setIsOpen] = React.useState(false)
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
                        Community Specific Templates body
                    </div>
                )}
            </Card>
        </div>
    )
}
