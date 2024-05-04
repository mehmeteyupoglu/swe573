import { PostData } from '@/@types/post'
import { apiGetPost } from '@/services/PostService'
import { formatDate } from '@/utils/helpers'
import useFetchData from '@/utils/hooks/useFetchData'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

export default function PostView() {
    const { id } = useParams<{ id: string }>()

    const post = useFetchData(apiGetPost, [id])

    useEffect(() => {
        if (post && post.data) {
            console.log('post', post.data as PostData)
        }
    }, [post])
    return (
        <div>
            {post && post.data ? (
                <div>
                    <h5>{(post.data as PostData).content[0].field_value}</h5>
                    <p>{(post.data as PostData).content[1].field_value}</p>
                    <p>
                        {'Posted on: ' +
                            formatDate((post.data as PostData).created_at)}
                    </p>
                    <p>
                        {'Updated on: ' +
                            formatDate((post.data as PostData).updated_at)}
                    </p>
                    <p>
                        {'Posted by: ' +
                            (post.data as PostData).user.firstname +
                            ' ' +
                            (post.data as PostData).user.lastname}
                    </p>
                    <p>
                        {'Community: ' + (post.data as PostData).community.name}
                    </p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}
