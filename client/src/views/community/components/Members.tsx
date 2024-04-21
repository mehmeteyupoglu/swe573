import { IndividualCommunityType, Member } from '@/@types/community'
import { Button, Card } from '@/components/ui'
import {
    apiFetchMembers,
    apiJoinCommunity,
    apiLeaveCommunity,
} from '@/services/CommunityService'
import { toggleFetchTrigger, useAppSelector } from '@/store'
import { formatDate } from '@/utils/helpers'
import useRequestWithNotification from '@/utils/hooks/useRequestWithNotification'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Members({
    community,
}: {
    community: IndividualCommunityType
}) {
    const [members, setMembers] = useState<Member[]>([])
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const fetchTrigger = useAppSelector(
        (state) => state.community.community.fetchTrigger
    )
    const userId = useAppSelector((state) => state.auth.user?.id)

    const {
        id,
        num_members,
        name,
        description,
        updated_at,
        is_member,
        is_public,
        is_owner,
    } = community

    const cardFooter = (
        <div className="flex items-center justify-between">
            {/* {renderButton()} */}
        </div>
    )

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const members = await apiFetchMembers(String(id) ?? '')
                if (members.status === 200) {
                    setMembers(members.data as Member[])
                }
                // fetch members data
                console.log('fetching members')
            } catch (error) {
                console.error('Error fetching members', error)
            }
        }

        fetchMembers()
    }, [fetchTrigger])

    const Members = () => {
        return (
            <div className="members mt-5">
                {members &&
                    members.length > 0 &&
                    members.map((item: Member) => {
                        return (
                            <div className="flex justify-between">
                                <p>{item.firstname + ' ' + item.lastname}</p>
                                <p className="underline">
                                    {'Member since' +
                                        ' ' +
                                        formatDate(item.joined_at ?? '')}
                                </p>
                            </div>
                        )
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
