import { formatDate, mapRoleToLabel } from '@/utils/helpers'
import { ColumnDef } from '@tanstack/react-table'

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
        header: 'Durum',
        accessorKey: 'action',
        cell: (props) => {
            const row = props.row.original
            return <div className="flex">action</div>
        },
    },
]

export default columns
