import { useState, useEffect, Suspense } from 'react'
import Tabs from '@/components/ui/Tabs'
import AdaptableCard from '@/components/shared/AdaptableCard'
import Container from '@/components/shared/Container'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAppSelector } from '@/store'
import { IndividualCommunityType } from '@/@types/community'
import { apiGetCommunity } from '@/services/CommunityService'
import { Notification, toast } from '@/components/ui'
import CommunityDetail from './components/CommunityDetail'
import Members from './components/Members'

const { TabNav, TabList } = Tabs

const Settings = () => {
    const [community, setCommunity] = useState<IndividualCommunityType>(
        {} as IndividualCommunityType
    )
    const user = useAppSelector((state) => state.auth.user)
    const [currentTab, setCurrentTab] = useState('profile')
    const navigate = useNavigate()
    const location = useLocation()

    const { id } = useParams<{ id: string }>()
    const userId = useAppSelector((state) => state.auth.user?.id)
    const fetchTrigger = useAppSelector(
        (state) => state.community.community.fetchTrigger
    )

    const onTabChange = (val: string) => {
        setCurrentTab(val)
        navigate(`/community/${id}/${val}`)
    }

    useEffect(() => {
        const pathSegments = location.pathname.split('/')
        const lastPathSegment = pathSegments[pathSegments.length - 1]
        setCurrentTab(lastPathSegment)
    }, [location.pathname])

    const communityDetailsMenu: Record<
        string,
        {
            label: string
            path: string
        }
    > = {
        details: { label: 'Details', path: 'details' },
        members: { label: 'Members', path: 'members' },
        posts: {
            label: 'Posts',
            path: 'posts',
        },
    }

    useEffect(() => {
        const fetchCommunity = async () => {
            try {
                // fetch community data
                const resp = await apiGetCommunity(id ?? '', userId ?? '')

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
        <Container>
            <AdaptableCard>
                <Tabs
                    value={currentTab}
                    variant="pill"
                    onChange={(val) => onTabChange(val)}
                >
                    <TabList className="pb-4">
                        {Object.keys(communityDetailsMenu).map((key) => (
                            <TabNav key={key} value={key}>
                                {communityDetailsMenu[key].label}
                            </TabNav>
                        ))}
                    </TabList>
                </Tabs>
                <div className="px-1 py-2 md:px-4 md:py-6">
                    <Suspense fallback={<></>}>
                        {currentTab === 'details' && (
                            <CommunityDetail community={community} />
                        )}
                        {currentTab === 'members' && (
                            <Members community={community} />
                        )}
                        {currentTab === 'ingredients' && <div>Posts</div>}
                    </Suspense>
                </div>
            </AdaptableCard>
        </Container>
    )
}

export default Settings
