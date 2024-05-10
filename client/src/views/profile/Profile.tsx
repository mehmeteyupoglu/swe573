import { Post } from '@/@types/user'
import { ActionLink } from '@/components/shared'
import { apiGetUserInformation } from '@/services/UserService'
import useFetchData from '@/utils/hooks/useFetchData'
import { AxiosResponse } from 'axios'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

type CustomerInfoFieldProps = {
    title?: string
    value?: string
}

const CustomerInfoField = ({ title, value }: CustomerInfoFieldProps) => {
    return (
        <div>
            <span>{title}</span>
            <p className="text-gray-700 dark:text-gray-200 font-semibold">
                {!!value ? value : ' - '}
            </p>
        </div>
    )
}

const MapPost = ({ post }: { post: Post }) => {
    return (
        <div>
            <ActionLink to={`/post/${post.id}`}>
                {JSON.parse(post.content)[0].field_value}
            </ActionLink>
        </div>
    )
}

export default function Profile() {
    const userId = useParams<{ id: string }>().id

    const userInfo = useFetchData<AxiosResponse>(apiGetUserInformation, [
        userId,
    ])

    const { firstname, lastname, email, username, dob, country, short_info } =
        userInfo?.data || {}

    return (
        <div>
            <div className="grid grid-cols-1 xl:grid-cols-2 xl:grid-cols-1 gap-y-7 gap-x-4 mt-8">
                <CustomerInfoField
                    title="Full Name"
                    value={`${firstname} ${lastname}`}
                />
                <CustomerInfoField title="Email" value={email} />
                <CustomerInfoField title="Username" value={username} />
                <CustomerInfoField title="Date of birth" value={dob} />
                <CustomerInfoField title="Country" value={country} />
                <CustomerInfoField title="Short Info" value={short_info} />

                <div>
                    <span>Posts</span>
                    <div>
                        {userInfo?.data?.posts.map((post: Post) => (
                            <MapPost key={post.id} post={post} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
