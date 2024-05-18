import { PostData } from '@/@types/post'
import React from 'react'

export default function Post({ post }: { post: PostData }) {
    return (
        <div>
            {post.content && (
                <>
                    <div>{post.content[0].field_value}</div>
                    <div>{post.content[1].field_value}</div>
                </>
            )}
        </div>
    )
}
