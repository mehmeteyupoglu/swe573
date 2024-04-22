import { Button } from '@/components/ui'
import { formatDate, mapRoleToLabel } from '@/utils/helpers'
import { ColumnDef } from '@tanstack/react-table'
import React from 'react'

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

            if (row.role != 1) {
                return (
                    <Button
                        // disabled={is_owner}
                        className="bg-blue-500 text-white"
                        size="sm"
                        variant="solid"
                        onClick={() => console.log({ row })}
                    >
                        Assign Moderator
                    </Button>
                )
            }
        },
    },
]

export default columns
