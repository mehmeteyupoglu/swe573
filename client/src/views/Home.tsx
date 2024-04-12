import RecentCommunities from './community/components/RecentCommunities'
import DisplayPost from './post/components/DisplayPost'

const Home = () => {
    return (
        <div className="flex gap-5">
            <div className="grow">
                <h3>Hot Topics</h3>
                <DisplayPost />
                <DisplayPost />
                <DisplayPost />
            </div>
            <RecentCommunities />
        </div>
    )
}

export default Home
