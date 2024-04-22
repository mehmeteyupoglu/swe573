import { useMemo, useState } from 'react'
import DataTable from '@/components/shared/DataTable'
import type { ColumnDef } from '@/components/shared/DataTable'
import columns from './MembersTableColumns'
import { IndividualCommunityType, Member } from '@/@types/community'

import { Button } from '@/components/ui'
import { apiChangeUserRole } from '@/services/CommunityService'
import { toggleFetchTrigger } from '@/store'
import { formatDate, mapRoleToLabel } from '@/utils/helpers'
import useRequestWithNotification from '@/utils/hooks/useRequestWithNotification'
import { useDispatch } from 'react-redux'

const MembersTable = ({
    members,
    community,
}: {
    members: Member[]
    community: IndividualCommunityType
}) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { is_owner } = community

    const dispatch = useDispatch()

    const [handleChangeRole, isChangingRole] = useRequestWithNotification(
        apiChangeUserRole,
        'Role has been successfully changed!',
        'Error changing role',
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
            header: 'Email',
            accessorKey: 'email',
        },
        {
            header: 'Role',
            accessorKey: 'role',
            cell: (props) => {
                const row = props.row.original
                return <div className="flex">{mapRoleToLabel(row.role)}</div>
            },
        },
        {
            header: 'Member Since',
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

                if (row.role === -1) {
                    return (
                        <Button
                            disabled
                            className="bg-blue-500 text-white"
                            size="sm"
                            variant="solid"
                            onClick={() => console.log({ row })}
                        >
                            Owner
                        </Button>
                    )
                } else if (row.role === 0) {
                    return (
                        <Button
                            // disabled={is_owner}
                            className="bg-blue-500 text-white"
                            size="sm"
                            variant="solid"
                            onClick={() => {
                                if (typeof handleChangeRole === 'function') {
                                    console.log(row)
                                    handleChangeRole(row.id, row.id, 1)
                                }
                            }}
                        >
                            Assign Moderator
                        </Button>
                    )
                } else
                    return (
                        <Button
                            // disabled={is_owner}
                            className="bg-blue-500 text-white"
                            size="sm"
                            variant="solid"
                            onClick={() => console.log({ row })}
                        >
                            Remove
                        </Button>
                    )
            },
        },
    ]

    const filteredColumns = columns.filter((item) => item.header !== 'Actions')

    return (
        <div>
            {is_owner && (
                <p className="mb-2">You are the owner of this community</p>
            )}
            <DataTable
                columns={is_owner ? columns : filteredColumns}
                data={members}
                loading={isLoading}
            />
        </div>
    )
}

export default MembersTable
