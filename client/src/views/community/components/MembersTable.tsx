import { useMemo, useState } from 'react'
import DataTable from '@/components/shared/DataTable'
import type { ColumnDef } from '@/components/shared/DataTable'
import { UserOwnsType } from '@/@types/user'
import columns from './MembersTableColumns'
import { Member } from '@/@types/community'

const MembersTable = ({ members }: { members: Member[] }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)

    console.log('members', members)

    const _columns: ColumnDef<any>[] = useMemo(() => columns, [])

    return <DataTable columns={_columns} data={members} loading={isLoading} />
}

export default MembersTable
