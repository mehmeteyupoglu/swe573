import { useMemo, useState } from 'react'
import DataTable from '@/components/shared/DataTable'
import type { ColumnDef } from '@/components/shared/DataTable'
import columns from './MembersTableColumns'
import { IndividualCommunityType, Member } from '@/@types/community'

const MembersTable = ({
    members,
    community,
}: {
    members: Member[]
    community: IndividualCommunityType
}) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { is_owner } = community

    const _columns: ColumnDef<any>[] = useMemo(() => columns, [])
    const filteredColumns = _columns.filter((item) => item.header !== 'Actions')

    return (
        <div>
            {is_owner && (
                <p className="mb-2">You are the owner of this community</p>
            )}
            <DataTable
                columns={is_owner ? _columns : filteredColumns}
                data={members}
                loading={isLoading}
            />
        </div>
    )
}

export default MembersTable
