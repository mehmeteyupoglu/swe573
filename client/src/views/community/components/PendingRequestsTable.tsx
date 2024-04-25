import { useMemo, useState } from 'react'
import DataTable from '@/components/shared/DataTable'
import type { ColumnDef } from '@/components/shared/DataTable'
import columns from './MembersTableColumns'
import { IndividualCommunityType, JoinRequest } from '@/@types/community'

import { Button } from '@/components/ui'
import {
    apiAcceptRejectRequest,
    apiChangeUserRole,
} from '@/services/CommunityService'
import { toggleFetchTrigger } from '@/store'
import { formatDate, mapRoleToLabel } from '@/utils/helpers'
import useRequestWithNotification from '@/utils/hooks/useRequestWithNotification'
import { useDispatch } from 'react-redux'

const PendingRequestsTable = ({
    joinRequests,
    community,
}: {
    joinRequests: JoinRequest[]
    community: IndividualCommunityType
}) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { is_owner, id } = community

    const dispatch = useDispatch()

    const [handleAcceptReject, isChangingRole] = useRequestWithNotification(
        apiAcceptRejectRequest,
        'Action taken successfully',
        'Error taking action',
        () => dispatch(toggleFetchTrigger())
    )

    const columns: ColumnDef<any>[] = [
        {
            header: 'Name',
            accessorKey: 'firstname',
        },
        {
            header: 'Last Name',
            accessorKey: 'lastname',
        },
        {
            header: 'Username',
            accessorKey: 'username',
        },
        {
            header: 'Request Date',
            accessorKey: 'joined_at',
            cell: (props) => {
                const row = props.row.original
                const formattedDate = formatDate(row.joined_at)
                return <div className="flex">{formattedDate}</div>
            },
        },
        {
            header: 'Actions',
            accessorKey: 'actions',
            cell: (props) => {
                const row = props.row.original

                const { id, status } = row

                if (status === 0) {
                    return (
                        <div>
                            <Button
                                size="sm"
                                variant="solid"
                                onClick={() => {
                                    if (
                                        typeof handleAcceptReject === 'function'
                                    ) {
                                        handleAcceptReject(id, 1)
                                    }
                                }}
                                className="bg-green-960 text-white mr-2"
                            >
                                Accept
                            </Button>
                            <Button
                                className="bg-red-500 text-white"
                                size="sm"
                                variant="solid"
                                onClick={() => {
                                    if (
                                        typeof handleAcceptReject === 'function'
                                    ) {
                                        handleAcceptReject(id, -1)
                                    }
                                }}
                            >
                                Decline
                            </Button>
                        </div>
                    )
                } else if (status === 1) {
                    return <div className="flex">Accepted</div>
                } else {
                    return <div className="flex">Rejected</div>
                }
            },
        },
    ]

    return (
        <div>
            <DataTable
                columns={columns}
                data={joinRequests}
                loading={isLoading}
            />
        </div>
    )
}

export default PendingRequestsTable
