import { CommunityType } from '@/@types/community'

export default function Community({ community }: { community: CommunityType }) {
    return (
        <div>
            {community.name} - {community.description}
        </div>
    )
}
