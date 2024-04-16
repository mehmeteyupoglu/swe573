import { IndividualCommunityType } from '@/@types/community'
import { Button, Card, Notification, toast } from '@/components/ui'
import {
    apiIsUserInCommunity,
    apiJoinCommunity,
    apiLeaveCommunity,
} from '@/services/CommunityService'
import { toggleFetchTrigger, useAppSelector } from '@/store'
import { formatDate } from '@/utils/helpers'
import useRequestWithNotification from '@/utils/hooks/useRequestWithNotification'
import { useEffect, useState } from 'react'
import { HiLockClosed, HiLockOpen } from 'react-icons/hi'
import { useDispatch } from 'react-redux'

export default function IndividualCommunity({
    community,
}: {
    community: IndividualCommunityType
}) {
    const dispatch = useDispatch()
    const fetchTrigger = useAppSelector(
        (state) => state.community.community.fetchTrigger
    )
    const userId = useAppSelector((state) => state.auth.user?.id)
    const { id } = community

    const [handleJoinCommunity, isJoining] = useRequestWithNotification(
        apiJoinCommunity,
        'You have successfully joined the community!',
        'Error joining community',
        () => dispatch(toggleFetchTrigger())
    )

    const [handleLeaveCommunity, isLeaving] = useRequestWithNotification(
        apiLeaveCommunity,
        'You have successfully left the community!',
        'Error leaving community',
        () => dispatch(toggleFetchTrigger())
    )

    const renderButton = () => {
        if (community.is_member) {
            return (
                <Button
                    className="bg-blue-500 text-white"
                    size="sm"
                    variant="solid"
                    onClick={() =>
                        typeof handleLeaveCommunity === 'function' &&
                        handleLeaveCommunity(String(id) ?? '', userId ?? '')
                    }
                >
                    Leave
                </Button>
            )
        } else {
            return (
                <Button
                    className="bg-blue-500 text-white"
                    size="sm"
                    variant="solid"
                    onClick={() =>
                        typeof handleJoinCommunity === 'function' &&
                        handleJoinCommunity(String(id) ?? '', userId ?? '')
                    }
                >
                    Join
                </Button>
            )
        }
    }

    const cardFooter = (
        <div className="flex items-center justify-between">
            {renderButton()}
            <span>
                <h6 className="text-sm">Last Activity</h6>
                <span className="text-xs">
                    {formatDate(community.updated_at)}
                </span>
            </span>
        </div>
    )

    return (
        <div className="max-w-xl mb-5">
            <Card
                clickable
                className="hover:shadow-lg transition duration-150 ease-in-out dark:border dark:border-gray-600 dark:border-solid"
                footer={cardFooter}
                headerClass="p-0"
                footerBorder={false}
                headerBorder={false}
            >
                <div className="w-full bg-gray-200 dark:bg-gray-800 flex justify-between">
                    <span className="text-emerald-600 font-semibold">
                        {community.num_members || community.members?.length}{' '}
                        members, 20 posts
                    </span>
                    <span className="font-semibold">
                        {community.is_public ? (
                            <p className="underline text-emerald-600">
                                Public{' '}
                                <HiLockOpen className="inline-block ml-2 " />
                            </p>
                        ) : (
                            <p className="underline">
                                Private
                                <HiLockClosed className="inline-block ml-2" />
                            </p>
                        )}
                    </span>
                </div>
                <h4 className="font-bold my-3">{community.name}</h4>
                <p>{community.description}</p>
            </Card>
        </div>
    )
}
