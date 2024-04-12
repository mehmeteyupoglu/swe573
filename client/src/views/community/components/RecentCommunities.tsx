import { Card } from '@/components/ui'
import IndividualCommunity from './IndividualCommunity'

export default function RecentCommunities() {
    return (
        <div>
            <h3>Recent Communities</h3>
            <Card className="mt-3 h-75 overflow-auto">
                <IndividualCommunity />
                <IndividualCommunity />
                <IndividualCommunity />
                <IndividualCommunity />
                <IndividualCommunity />
                <IndividualCommunity />
                <IndividualCommunity />
            </Card>
        </div>
    )
}
