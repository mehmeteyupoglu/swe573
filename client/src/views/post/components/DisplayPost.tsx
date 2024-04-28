import { PostData } from '@/@types/post'
import { Card } from '@/components/ui'
import { formatDate } from '@/utils/helpers'
import { HiUserGroup } from 'react-icons/hi'

export default function DisplayPost({ post }: { post: PostData }) {
    const { firstname, lastname, content, community, created_at } = post
    return (
        <Card className="mt-3">
            <div className="header justify-between">
                <h3>{content[0].field_value}</h3>
                <div className="flex items-center">
                    <p className="mr-3">{community.name}</p>
                    <HiUserGroup />
                </div>
            </div>
            <div className="body mt-5 mb-5">
                <p>{content[1].field_value}</p>
            </div>
            <div className="footer flex justify-between">
                <p>
                    Posted by
                    <span className="italic">
                        {' ' + firstname + ' ' + lastname}
                    </span>{' '}
                    at{' '}
                    <span className="underline"> {formatDate(created_at)}</span>
                </p>
                <div className="flex ">
                    <p>Comments (3)</p>
                    <p className="ml-3">Upvote (8) </p>
                </div>
            </div>
        </Card>
    )
}
