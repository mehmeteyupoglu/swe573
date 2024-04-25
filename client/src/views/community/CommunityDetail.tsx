import { useState, useEffect, Suspense } from 'react'
import Tabs from '@/components/ui/Tabs'
import AdaptableCard from '@/components/shared/AdaptableCard'
import Container from '@/components/shared/Container'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAppSelector } from '@/store'
import { IndividualCommunityType } from '@/@types/community'
import { apiGetCommunity, apiGetUserRole } from '@/services/CommunityService'
import { Button, Notification, toast } from '@/components/ui'
import CommunityDetail from './components/CommunityDetail'
import Members from './components/Members'
import { AuthorityCheck } from '@/components/shared'
import useFetchData from '@/utils/hooks/useFetchData'
import { mapRoleToLabel } from '@/utils/helpers'

const { TabNav, TabList } = Tabs

const Settings = () => {
    const [community, setCommunity] = useState<IndividualCommunityType>(
        {} as IndividualCommunityType
    )
    const [currentTab, setCurrentTab] = useState('profile')
    const navigate = useNavigate()
    const location = useLocation()

    const [mappedRole, setMappedRole] = useState<string>('')
    const { id } = useParams<{ id: string }>()
    const userId = useAppSelector((state) => state.auth.user?.id)
    const fetchTrigger = useAppSelector(
        (state) => state.community.community.fetchTrigger
    )

    const onTabChange = (val: string) => {
        setCurrentTab(val)
        navigate(`/community/${id}/${val}`)
    }

    const userRole = useFetchData(apiGetUserRole, [id, userId])

    // useEffect(() => {
    //     const fetchUserRole = async () => {
    //         try {
    //             const resp = await apiGetUserRole(id ?? '', userId ?? '')
    //             setMappedRole(mapRoleToLabel((resp.data as any)?.role || ''))
    //         } catch (error) {
    //             console.error('Error fetching user role:', error)
    //         }
    //     }

    //     fetchUserRole()
    // }, [])

    useEffect(() => {
        if (userRole) {
            setMappedRole(mapRoleToLabel((userRole as any)?.data?.role))
        }
    }, [userRole])

    useEffect(() => {
        const pathSegments = location.pathname.split('/')
        const lastPathSegment = pathSegments[pathSegments.length - 1]
        setCurrentTab(lastPathSegment)
    }, [location.pathname])

    useEffect(() => {
        console.log({ mappedRole })
    }, [mappedRole])

    const communityDetailsMenu: Record<
        string,
        {
            label: string
            path: string
            authority?: string[]
        }
    > = {
        details: { label: 'Details', path: 'details' },
        members: { label: 'Members', path: 'members' },
        posts: {
            label: 'Posts',
            path: 'posts',
        },
        pendingRequests: {
            label: 'Pending Requests',
            path: 'pendingRequests',
            authority: ['owner', 'moderator'],
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
                {mappedRole && (
                    <Tabs
                        value={currentTab}
                        variant="pill"
                        onChange={(val) => onTabChange(val)}
                    >
                        <TabList className="pb-4">
                            {Object.keys(communityDetailsMenu).map((key) => (
                                <AuthorityCheck
                                    key={key}
                                    authority={[mappedRole]}
                                    userAuthority={
                                        communityDetailsMenu[key].authority ||
                                        []
                                    }
                                >
                                    <TabNav value={key}>
                                        {communityDetailsMenu[key].label}
                                    </TabNav>
                                </AuthorityCheck>
                            ))}
                        </TabList>
                    </Tabs>
                )}
                <div className="px-1 py-2 md:px-4 md:py-6">
                    <Suspense fallback={<></>}>
                        {currentTab === 'details' && (
                            <CommunityDetail community={community} />
                        )}
                        {currentTab === 'members' && (
                            <Members community={community} />
                        )}
                        {currentTab === 'ingredients' && <div>Posts</div>}
                        {currentTab === 'pendingRequests' && (
                            <div>Pending Requests</div>
                        )}
                    </Suspense>
                </div>
            </AdaptableCard>
        </Container>
    )
}

export default Settings
