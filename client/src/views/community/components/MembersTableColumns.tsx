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
    },
    {
        header: 'Member Since',
        accessorKey: 'joined_at',
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
