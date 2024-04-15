import { IndividualCommunityType } from '@/@types/community'
import { Button, Card, Notification, toast } from '@/components/ui'
import {
    apiGetCommunity,
    apiIsUserInCommunity,
    apiJoinCommunity,
} from '@/services/CommunityService'
import { useAppSelector } from '@/store'
import { formatDate } from '@/utils/helpers'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

export default function IndividualCommunity() {
    const [community, setCommunity] = useState<IndividualCommunityType>(
        {} as IndividualCommunityType
    )

    const [isUserInCommunity, setIsUserInCommunity] = useState(false)

    const userId = useAppSelector((state) => state.auth.user?.id)

    const { id } = useParams<{ id: string }>()

    const navigate = useNavigate()

    useEffect(() => {
        const fetchCommunity = async () => {
            try {
                // fetch community data
                const resp = await apiGetCommunity(id ?? '')

                if (resp.status === 200) {
                    setCommunity(resp.data as IndividualCommunityType)
                } else if (resp.status === 404) {
                    // community not found
                    navigate('/home')
                }
            } catch (error) {
                console.error('Error fetching community:', error)

                if ((error as any).response?.status === 404) {
                    navigate('/home')
                }

                toast.push(
                    <Notification
                        title={'Error fetching community'}
                        type="danger"
                    />,
                    {
                        placement: 'top-center',
                    }
                )
            }
        }
        fetchCommunity()
    }, [id])

    useEffect(() => {
        const checkUserInCommunity = async () => {
            try {
                // check if user is in community
                const resp = await apiIsUserInCommunity(id ?? '', userId ?? '')
                setIsUserInCommunity(
                    (resp.data as { is_member: boolean }).is_member
                )
            } catch (error) {
                console.error('Error checking user in community:', error)
            }
        }
        checkUserInCommunity()
    }, [id, userId])

    const renderButton = () => {
        if (isUserInCommunity) {
            return (
                <Button
                    className="bg-blue-500 text-white"
                    size="sm"
                    variant="solid"
                    onClick={() => navigate(`/community/${id}/`)}
                >
                    Leave
                </Button>
            )
        } else {
            return (
                <Button
                    className="bg-blue-500 text-white"
                    size="sm"
                    variant="solid"
                    onClick={handleJoinCommunity}
                >
                    Join
                </Button>
            )
        }
    }

    const handleJoinCommunity = async () => {
        try {
            // join community
            const resp = await apiJoinCommunity(id ?? '', userId ?? '')
            if (resp.status === 200) {
                console.log('Joined community')
                toast.push(
                    <Notification
                        title={'You have successfully joined the community!'}
                        type="success"
                    />,
                    {
                        placement: 'top-center',
                    }
                )
            }
        } catch (error) {
            console.error('Error joining community:', error)
            toast.push(
                <Notification
                    title={'Error joining community'}
                    type="danger"
                />,
                {
                    placement: 'top-center',
                }
            )
        }
    }

    const cardFooter = (
        <div className="flex items-center justify-between">
            {renderButton()}
            <span>
                <h6 className="text-sm">Last Activity</h6>
                <span className="text-xs">
                    {formatDate(community.updated_at)}
                </span>
            </span>
        </div>
    )
    // const { id, name, description, updated_at, is_public, num_members } =
    //     community
    return (
        <div className="max-w-xl">
            <Card
                clickable
                className="hover:shadow-lg transition duration-150 ease-in-out dark:border dark:border-gray-600 dark:border-solid"
                footer={cardFooter}
                headerClass="p-0"
                footerBorder={false}
                headerBorder={false}
            >
                <span className="text-emerald-600 font-semibold">
                    {community.num_members} members, 20 posts
                </span>
                <h4 className="font-bold my-3">{community.name}</h4>
                <p>{community.description}</p>
            </Card>
        </div>
    )
}
