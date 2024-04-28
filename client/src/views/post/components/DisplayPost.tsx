import { PostData } from '@/@types/post'
import { Card } from '@/components/ui'
import React from 'react'
import { HiUserGroup } from 'react-icons/hi'

export default function DisplayPost({ post }: { post: PostData }) {
    return (
        <Card className="mt-3">
            <div className="header justify-between">
                <h3>Post Title</h3>
                <div className="flex items-center">
                    <p className="mr-3">Community</p>
                    <HiUserGroup />
                </div>
            </div>
            <div className="body mt-5 mb-5">
                <p>Post Content Post Content Post Content Post Content</p>
            </div>
            <div className="footer flex justify-between">
                <p>Posted by user x at y</p>
                <div className="flex ">
                    <p>Comments (3)</p>
                    <p className="ml-3">Upvote (8) </p>
                </div>
            </div>
        </Card>
    )
}
