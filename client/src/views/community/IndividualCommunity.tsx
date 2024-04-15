import { IndividualCommunityType } from '@/@types/community'
import { Button, Card } from '@/components/ui'
import { apiGetCommunity } from '@/services/CommunityService'
import { formatDate } from '@/utils/helpers'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function IndividualCommunity() {
    const [community, setCommunity] = useState<IndividualCommunityType>(
        {} as IndividualCommunityType
    )

    const { id } = useParams<{ id: string }>()

    useEffect(() => {
        const fetchCommunity = async () => {
            // fetch community data
            const resp = await apiGetCommunity(id ?? '')
            if (resp.status === 200) {
                setCommunity(resp.data as IndividualCommunityType)
            }
        }
        fetchCommunity()
    }, [id])

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
                <span className="text-xs">
                    {formatDate(community.updated_at)}
                </span>
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
                    {community.num_members} members, 20 posts
                </span>
                <h4 className="font-bold my-3">{community.name}</h4>
                <p>{community.description}</p>
            </Card>
        </div>
    )
}
