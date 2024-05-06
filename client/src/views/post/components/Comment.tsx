import { CommentResponseType } from '@/@types/post'
import { Card } from '@/components/ui'
import { truncateText } from '@/utils/helpers'
import { useState } from 'react'
import { HiChevronDown } from 'react-icons/hi'

export default function Comment({ comment }: { comment: CommentResponseType }) {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <Card
            className="min-w-[320px] md:min-w-[450px] mt-3 ml-5"
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
                        <HiChevronDown size="30" className="mr-3 transform" />
                    )}
                    <div className="text-gray">
                        {truncateText(comment.content, 50)}
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className="body">{<div>{comment.content}</div>}</div>
            )}
        </Card>
    )
}
