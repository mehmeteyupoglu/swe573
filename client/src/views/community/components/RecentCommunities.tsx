import React from 'react'
import { Card } from '@/components/ui'

export default function RecentCommunities() {
    return (
        <div>
            <h3>Recent Communities</h3>
            <Card className="mt-3">
                <div className="community-card border-1 border-slate-500 mt-1">
                    <p>Community Name</p>
                    <p>Members: 100</p>
                    <p>Posts</p>
                </div>
                <div className="community-card">
                    <p>Community Name</p>
                    <p>Members: 100</p>
                    <p>Posts</p>
                </div>
                <div className="community-card">
                    <p>Community Name</p>
                    <p>Members: 100</p>
                    <p>Posts</p>
                </div>
            </Card>
        </div>
    )
}
