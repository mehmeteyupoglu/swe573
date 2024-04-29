import { CommunityType } from '@/@types/community'

export default function Community({ community }: { community: CommunityType }) {
    console.log({ community })
    return (
        <div>
            {community.name} - {community.description}
        </div>
    )
}
