import { IndividualCommunityType } from '@/@types/community'
import { Button, Card, Notification, toast } from '@/components/ui'
import {
    apiIsUserInCommunity,
    apiJoinCommunity,
    apiLeaveCommunity,
} from '@/services/CommunityService'
import { toggleFetchTrigger, useAppSelector } from '@/store'
import { formatDate } from '@/utils/helpers'
import { useEffect, useState } from 'react'
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
    const [isUserInCommunity, setIsUserInCommunity] = useState(false)
    const userId = useAppSelector((state) => state.auth.user?.id)
    const { id } = community

    useEffect(() => {
        const checkUserInCommunity = async () => {
            try {
                // check if user is in community
                const resp = await apiIsUserInCommunity(
                    String(id) ?? '',
                    userId ?? ''
                )
                setIsUserInCommunity(
                    (resp.data as { is_member: boolean }).is_member
                )
            } catch (error) {
                console.error('Error checking user in community:', error)
            }
        }
        checkUserInCommunity()
    }, [id, userId, fetchTrigger]) // TODO: check fetch trigger functionality

    const renderButton = () => {
        if (isUserInCommunity) {
            return (
                <Button
                    className="bg-blue-500 text-white"
                    size="sm"
                    variant="solid"
                    onClick={handleLeaveCommunity}
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
                    onClick={handleJoinCommunity}
                >
                    Join
                </Button>
            )
        }
    }

    const handleJoinCommunity = async () => {
        try {
            // join community
            const resp = await apiJoinCommunity(String(id) ?? '', userId ?? '')
            if (resp.status === 200) {
                dispatch(toggleFetchTrigger())
                toast.push(
                    <Notification
                        title={'You have successfully joined the community!'}
                        type="success"
                    />,
                    {
                        placement: 'top-center',
                    }
                )
            }
        } catch (error) {
            console.error('Error joining community:', error)
            toast.push(
                <Notification
                    title={'Error joining community'}
                    type="danger"
                />,
                {
                    placement: 'top-center',
                }
            )
        }
    }

    const handleLeaveCommunity = async () => {
        try {
            // leave community
            const resp = await apiLeaveCommunity(String(id) ?? '', userId ?? '')
            if (resp.status === 200) {
                console.log('Joined community')
                toast.push(
                    <Notification
                        title={'You have successfully left the community!'}
                        type="success"
                    />,
                    {
                        placement: 'top-center',
                    }
                )

                dispatch(toggleFetchTrigger())
            }
        } catch (error) {
            console.error('Error leaving community:', error)
            toast.push(
                <Notification
                    title={'Error leaving community'}
                    type="danger"
                />,
                {
                    placement: 'top-center',
                }
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
                <span className="text-emerald-600 font-semibold">
                    {community.num_members || community.members?.length}{' '}
                    members, 20 posts
                </span>
                <h4 className="font-bold my-3">{community.name}</h4>
                <p>{community.description}</p>
            </Card>
        </div>
    )
}
