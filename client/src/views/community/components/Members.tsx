import { IndividualCommunityType, Member } from '@/@types/community'
import { Button, Card } from '@/components/ui'
import {
    apiJoinCommunity,
    apiLeaveCommunity,
} from '@/services/CommunityService'
import { toggleFetchTrigger, useAppSelector } from '@/store'
import { formatDate } from '@/utils/helpers'
import useRequestWithNotification from '@/utils/hooks/useRequestWithNotification'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Members({
    community,
}: {
    community: IndividualCommunityType
}) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const fetchTrigger = useAppSelector(
        (state) => state.community.community.fetchTrigger
    )
    const userId = useAppSelector((state) => state.auth.user?.id)
    const {
        id,
        members,
        num_members,
        name,
        description,
        updated_at,
        is_member,
        is_public,
        is_owner,
    } = community

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
        const generateButton = (text: string, handler: Function) => (
            <Button
                disabled={community.is_owner}
                className="bg-blue-500 text-white"
                size="sm"
                variant="solid"
                onClick={() =>
                    typeof handler === 'function' &&
                    handler(String(id) ?? '', userId ?? '')
                }
            >
                {text}
            </Button>
        )

        if (community.is_member) {
            return generateButton('Leave', handleLeaveCommunity as Function)
        } else if (!community.is_public) {
            if (community.has_user_requested && !community.is_member) {
                return generateButton(
                    'Cancel Request',
                    handleLeaveCommunity as Function
                )
            } else {
                return generateButton(
                    'Request to Join',
                    handleJoinCommunity as Function
                )
            }
        } else {
            return generateButton('Join', handleJoinCommunity as Function)
        }
    }

    const cardFooter = (
        <div className="flex items-center justify-between">
            {renderButton()}
        </div>
    )

    const Members = () => {
        return (
            <div className="members mt-5">
                {members &&
                    members.length > 0 &&
                    members.map((item: Member) => {
                        return <p>{item.firstname + ' ' + item.lastname}</p>
                    })}
            </div>
        )
    }

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
                <Members />
            </Card>
        </div>
    )
}
