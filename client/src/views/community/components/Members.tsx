import { IndividualCommunityType, Member } from '@/@types/community'
import { Card } from '@/components/ui'
import { apiFetchMembers } from '@/services/CommunityService'
import { useAppSelector } from '@/store'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import MembersTable from './MembersTable'
import NoData from '@/components/shared/NoData'

export default function Members({
    community,
}: {
    community: IndividualCommunityType
}) {
    const [members, setMembers] = useState<Member[]>([])
    const fetchTrigger = useAppSelector(
        (state) => state.community.community.fetchTrigger
    )
    const userId = useAppSelector((state) => state.auth.user?.id)

    const { id } = community

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

    return (
        <div className="mb-5">
            <Card
                clickable
                className="hover:shadow-lg transition duration-150 ease-in-out dark:border dark:border-gray-600 dark:border-solid"
                headerClass="p-0"
                footerBorder={false}
                headerBorder={false}
            >
                {!members || members.length === 0 ? (
                    <NoData />
                ) : (
                    <MembersTable members={members} community={community} />
                )}
            </Card>
        </div>
    )
}
