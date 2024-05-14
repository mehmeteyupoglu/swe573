import { useRef, useState } from 'react'
import { apiSearch } from '@/services/SearchService'
import { SearchType } from '@/@types/search'
import { CommunityType } from '@/@types/community'
import Community from '../search/components/Community'
import { Card, Radio } from '@/components/ui'
import Post from './components/Post'
import { PostData } from '@/@types/post'
import TableSearch from '../account/Settings/components/Search/TableSearch'

const Search = () => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [data, setData] = useState<any>(null)

    const [searchValue, setSearchValue] = useState('community')

    const onChange = (val: string) => {
        setSearchValue(val)
    }

    const handleInputChange = async (val: string) => {
        const query = val

        try {
            const response = await apiSearch(query)
            console.log('response', response.data)
            setData(response.data as SearchType)
            // Handle the response data here
        } catch (error) {
            // Handle any errors here
        }
    }

    return (
        <div className="">
            <Radio.Group value={searchValue} onChange={onChange}>
                <Radio value={'community'}>Community</Radio>
                <Radio value={'user'}>User</Radio>
                <Radio value={'post'}>Post</Radio>
            </Radio.Group>
            <TableSearch ref={inputRef} onInputChange={handleInputChange} />
            {data && data.communities && (
                <Card>
                    <h5>Communities:</h5>
                    {data.communities.map((community: CommunityType) => {
                        // console.log('community', community)
                        return <Community community={community} />
                    })}
                </Card>
            )}
            {data && data.posts && (
                <Card className="mt-5">
                    <h5>Posts:</h5>
                    {data.posts.map((post: PostData) => {
                        return <Post post={post} />
                    })}
                </Card>
            )}
        </div>
    )
}

export default Search
