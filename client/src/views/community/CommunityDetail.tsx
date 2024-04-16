import { IndividualCommunityType } from '@/@types/community'
import { Notification, toast } from '@/components/ui'
import { apiGetCommunity } from '@/services/CommunityService'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import IndividualCommunity from './components/IndividualCommunity'
import CommunityDetail from './components/CommunityDetail'
import { useAppSelector } from '@/store'

export default function IndividualCommunityView() {
    const [community, setCommunity] = useState<IndividualCommunityType>(
        {} as IndividualCommunityType
    )

    const userId = useAppSelector((state) => state.auth.user?.id)

    const [fetchTrigger, setFetchTrigger] = useState(false)

    const { id } = useParams<{ id: string }>()

    const navigate = useNavigate()

    useEffect(() => {
        const fetchCommunity = async () => {
            try {
                // fetch community data
                const resp = await apiGetCommunity(id ?? '', '1')

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
    }, [id, fetchTrigger])

    return (
        <div className="max-w-xl">
            <CommunityDetail community={community} />
        </div>
    )
}
