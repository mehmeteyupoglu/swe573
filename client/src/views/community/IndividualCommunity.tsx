import { IndividualCommunityType } from '@/@types/community'
import { Button, Card } from '@/components/ui'
import React from 'react'

export default function IndividualCommunity({
    community,
}: {
    community: IndividualCommunityType
}) {
    const cardFooter = (
        <div className="flex items-center justify-between">
            <Button
                className="bg-blue-500 text-white"
                size="sm"
                variant="solid"
            >
                Join
            </Button>
            <span>
                <h6 className="text-sm">Last Activity</h6>
                <span className="text-xs">Sep 23, 2021</span>
            </span>
        </div>
    )
    // const { id, name, description, updated_at, is_public, num_members } =
    //     community
    return (
        <div className="max-w-xl">
            <Card
                clickable
                className="hover:shadow-lg transition duration-150 ease-in-out dark:border dark:border-gray-600 dark:border-solid"
                footer={cardFooter}
                headerClass="p-0"
                footerBorder={false}
                headerBorder={false}
            >
                <span className="text-emerald-600 font-semibold">
                    10 members, 20 posts
                </span>
                <h4 className="font-bold my-3">Community header</h4>
                <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the
                    industry&apos;s.
                </p>
            </Card>
        </div>
    )
}
