import { IndividualCommunityType } from '@/@types/community'
import { apiGetCommunityList } from '@/services/CommunityService'
import React, { useEffect } from 'react'
import IndividualCommunity from './components/IndividualCommunity'

export default function Communities() {
    const [communities, setCommunities] = React.useState<
        IndividualCommunityType[]
    >([]) // Update initial state

    React.useEffect(() => {
        // Fetch communities
        const fetchCommunities = async () => {
            try {
                const response = await apiGetCommunityList()
                const data = response.data as IndividualCommunityType[] // Add type assertion here
                setCommunities(data)
            } catch (error) {
                console.error('Error fetching communities:', error)
            }
        }

        fetchCommunities()
    }, [])

    useEffect(() => {
        console.log(communities)
    }, [communities])
    return (
        <div>
            {communities.map((community) => (
                <IndividualCommunity key={community.id} community={community} />
            ))}
        </div>
    )
}
