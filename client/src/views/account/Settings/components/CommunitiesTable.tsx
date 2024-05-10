import { useState } from 'react'
import DataTable from '@/components/shared/DataTable'
import type { ColumnDef } from '@/components/shared/DataTable'
import { Badge, Button } from '@/components/ui'
import { toggleFetchTrigger, useAppSelector } from '@/store'
import { formatDate } from '@/utils/helpers'
import useRequestWithNotification from '@/utils/hooks/useRequestWithNotification'
import { useDispatch } from 'react-redux'
import { InvitationsType } from '@/@types/user'
import { apiAcceptRejectInvitation } from '@/services/UserService'
import { ActionLink } from '@/components/shared'
import { CommunityType } from '@/@types/community'
import { useNavigate } from 'react-router-dom'
import { apiLeaveCommunity } from '@/services/CommunityService'

const CommunitiesTable = ({
    communities,
}: {
    communities: CommunityType[]
}) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const userId = useAppSelector((state) => state.auth.user?.id)
    const navigate = useNavigate()

    const dispatch = useDispatch()

    const [handleLeaveCommunity, isLeaving] = useRequestWithNotification(
        apiLeaveCommunity,
        'You have left the community!',
        'Error leaving the community',
        () => dispatch(toggleFetchTrigger())
    )

    const columns: ColumnDef<any>[] = [
        {
            header: 'Community Name',
            accessorKey: 'name',
        },
        {
            header: 'Number of Members',
            accessorKey: 'members',
            cell: (props) => {
                const row = props.row.original
                return (
                    <Badge
                        className="mr-4"
                        content={row.members.length}
                        innerClass="bg-blue-500"
                    />
                )
            },
        },
        {
            header: 'Number of Posts',
            accessorKey: 'posts',
            cell: (props) => {
                const row = props.row.original
                return (
                    <Badge
                        className="mr-4"
                        content={row.number_of_posts}
                        innerClass="bg-blue-500"
                    />
                )
            },
        },
        {
            header: 'Last Activity',
            accessorKey: 'updated_at',
            cell: (props) => {
                const row = props.row.original
                const formattedDate = formatDate(row.updated_at)
                return <div className="flex">{formattedDate}</div>
            },
        },
        {
            header: 'Actions',
            accessorKey: 'actions',
            cell: (props) => {
                const row = props.row.original

                return (
                    <div>
                        <Button
                            // className="bg-blue-500 text-white"
                            size="sm"
                            variant="solid"
                            onClick={() => {
                                navigate(`/community/${row.id}/details`)
                            }}
                        >
                            Visit
                        </Button>
                        <Button
                            className="bg-red-500 text-white ml-5"
                            size="sm"
                            variant="solid"
                            onClick={() => {
                                if (
                                    typeof handleLeaveCommunity === 'function'
                                ) {
                                    handleLeaveCommunity(row.id, userId, 0)
                                }
                            }}
                        >
                            Leave
                        </Button>
                    </div>
                )
            },
        },
    ]

    return (
        <div>
            <DataTable
                columns={columns}
                data={communities}
                loading={isLoading}
            />
        </div>
    )
}

export default CommunitiesTable
