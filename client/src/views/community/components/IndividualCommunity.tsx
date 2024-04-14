import React from 'react'
import dayjs from 'dayjs'

export default function IndividualCommunity({
    community,
    members,
    recentActivity,
}: {
    community: string
    members: number
    recentActivity: string
}) {
    const formattedDate = dayjs(recentActivity).format('MMMM DD, YYYY')

    return (
        <div className="community-card mb-2">
            <p className="text-white font-bold">{community}</p>
            <p className="inline-flex">{members} Members</p>
            <p className="inline-flex ml-2">10 Posts</p>
            <p className="italic mb-4">Recent activity: {formattedDate}</p>
        </div>
    )
}
