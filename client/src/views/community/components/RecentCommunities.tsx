import { Card } from '@/components/ui'
import IndividualCommunity from './IndividualCommunity'
import { use } from 'i18next'
import { useEffect, useState } from 'react'
import { apiGetCommunityList } from '@/services/CommunityService'
import { CommunityType } from '@/@types/community'

export default function RecentCommunities() {
    const [communities, setCommunities] = useState<CommunityType[]>([])

    useEffect(() => {
        const fetchDefaultTemplate = async () => {
            const resp = await apiGetCommunityList()
            if (resp.status == 200) {
                setCommunities(resp.data as CommunityType[])
            }
        }
        fetchDefaultTemplate()
    }, [])

    useEffect(() => {
        console.log(communities)
    }, [communities])
    return (
        <div>
            <h3>Recent Communities</h3>
            <Card className="mt-3 h-75 overflow-auto">
                {communities.map((community) => (
                    <IndividualCommunity
                        key={community.id}
                        community={community.name}
                        members={community.members.length}
                        recentActivity={community.updated_at}
                    />
                ))}
            </Card>
        </div>
    )
}
