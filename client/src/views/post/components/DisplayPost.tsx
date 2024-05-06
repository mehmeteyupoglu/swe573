import { CommentResponseType, PostData } from '@/@types/post'
import { ActionLink } from '@/components/shared'
import { Badge, Card } from '@/components/ui'
import { apiGetComments, apiLikePost } from '@/services/PostService'
import { toggleFetchTrigger } from '@/store'
import { formatDate, truncateText } from '@/utils/helpers'
import useRequestWithNotification from '@/utils/hooks/useRequestWithNotification'
import { FaCommentAlt } from 'react-icons/fa'
import { HiOutlineThumbUp, HiThumbUp, HiUserGroup } from 'react-icons/hi'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Comment from './Comment'
import { useEffect, useState } from 'react'
import useFetchData from '@/utils/hooks/useFetchData'
import { AxiosResponse } from 'axios'

export default function DisplayPost({
    post,
    detailed = false,
}: {
    post: PostData
    detailed?: boolean
}) {
    const [showComment, setShowComment] = useState(false)
    const { user, content, community, created_at, id, likes, is_liked } = post
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const comments = useFetchData(apiGetComments, [id]) as AxiosResponse

    const handleClick = () => {
        navigate(`/post/${id}`)
    }

    const [handleLike, isLiking] = useRequestWithNotification(
        apiLikePost,
        'Action successful!',
        'Action failed!',
        () => dispatch(toggleFetchTrigger())
    )

    useEffect(() => {
        if (comments) {
            console.log(comments.data)
        }
    }, [comments])
    return (
        <div>
            <Card
                className="mt-3"
                onClick={!detailed ? handleClick : undefined}
                bodyClass="cursor-pointer"
            >
                <div className="header justify-between">
                    <h3>{content[0].field_value}</h3>
                    {detailed ? (
                        <ActionLink
                            to={`/community/${community.id}/details`}
                            className="text-blue-500 flex items-center"
                        >
                            {community.name}
                            <HiUserGroup className="ml-3" />
                        </ActionLink>
                    ) : (
                        <div className="flex items-center">
                            <p className="mr-3">{community.name}</p>
                            <HiUserGroup />
                        </div>
                    )}
                </div>
                <div className="body mt-5 mb-5">
                    <p>
                        {!detailed
                            ? truncateText(content[1].field_value, 60)
                            : content[1].field_value}
                    </p>
                </div>
                <div className="footer flex justify-between">
                    <p>
                        Posted by
                        {detailed ? (
                            <ActionLink
                                to={`/profile/${user.id}`}
                                className="italic mr-2"
                            >
                                {' ' + user.firstname + ' ' + user.lastname}
                            </ActionLink>
                        ) : (
                            <span className="italic mr-2">
                                {' ' + user.firstname + ' ' + user.lastname}
                            </span>
                        )}
                        at{' '}
                        <span className="underline">
                            {' '}
                            {formatDate(created_at)}
                        </span>
                    </p>
                    <div className="flex items-end justify-between">
                        <div className="comments flex items-center justify-between mr-5">
                            <FaCommentAlt
                                className=""
                                size={20}
                                onClick={() => {
                                    setShowComment(!showComment)
                                }}
                            />
                            <p>(3)</p>
                        </div>

                        <div className="likes flex items-center justify-between">
                            {is_liked ? (
                                <HiThumbUp
                                    className=""
                                    size={25}
                                    onClick={() => {
                                        if (typeof handleLike === 'function') {
                                            handleLike(user.id, id)
                                        }
                                    }}
                                />
                            ) : (
                                <HiOutlineThumbUp
                                    className=""
                                    size={25}
                                    onClick={() => {
                                        if (typeof handleLike === 'function') {
                                            handleLike(user.id, id)
                                        }
                                    }}
                                />
                            )}
                            <p>{`(${likes})`}</p>
                        </div>
                    </div>
                </div>
            </Card>
            {detailed &&
                showComment &&
                comments.data &&
                comments.data.map((item: CommentResponseType) => {
                    return <Comment comment={item} />
                })}
        </div>
    )
}
