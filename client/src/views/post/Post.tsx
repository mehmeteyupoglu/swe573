import { Member } from '@/@types/community'
import { apiFetchMembers } from '@/services/CommunityService'
import { useAppSelector } from '@/store'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function Post() {
    const [members, setMembers] = useState<Member[]>([])
    const fetchTrigger = useAppSelector(
        (state) => state.community.community.fetchTrigger
    )

    const { id } = useParams<{ id: string }>()

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
    return <div></div>
}
