import { Card } from '@/components/ui'
import React from 'react'
import { HiUserGroup } from 'react-icons/hi'

export default function DisplayPost() {
    return (
        <Card className="mt-3">
            <div className="header justify-between">
                <h3>Post Title</h3>
                <div className="flex items-center">
                    <p className="mr-3">Community</p>
                    <HiUserGroup />
                </div>
            </div>
            <div className="body">
                <p>Post Content</p>
            </div>
            <div className="footer flex justify-end">
                <p>Comments (3)</p>
                <p className="ml-3">Upvote (8) </p>
            </div>
        </Card>
    )
}
