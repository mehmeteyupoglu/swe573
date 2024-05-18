import { useRef, useState } from 'react'
import { apiSearch } from '@/services/SearchService'
import { SearchType } from '@/@types/search'
import { CommunityType } from '@/@types/community'
import Community from '../search/components/Community'
import { Card, Checkbox, FormItem, Radio } from '@/components/ui'
import Post from './components/Post'
import { PostData } from '@/@types/post'
import TableSearch from '../account/Settings/components/Search/TableSearch'
import { Field, FieldProps } from 'formik'

const Search = () => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [selectedDataTypes, setSelectedDataTypes] = useState<string[]>([
        'text',
    ])
    const [data, setData] = useState<any>(null)
    const [dataTypes, setDataTypes] = useState<
        (
            | 'text'
            | 'date'
            | 'geolocation'
            | 'number'
            | 'image'
            | 'video'
            | 'audio'
            | 'file'
        )[]
    >([])

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
            <div className="lg:flex justify-between mb-4">
                <h3>Advance Community Search</h3>
                <div className="flex flex-col lg:flex-row">
                    <TableSearch
                        ref={inputRef}
                        onInputChange={handleInputChange}
                    />
                    <Radio.Group
                        value={searchValue}
                        onChange={onChange}
                        className="ml-4 h-10 flex items-center"
                    >
                        <Radio value={'community'}>Community</Radio>
                        <Radio value={'post'}>Post</Radio>
                        <Radio value={'user'}>User</Radio>
                    </Radio.Group>
                </div>
            </div>

            {searchValue == 'community' && data && (
                <Card>
                    <h5>Communities:</h5>
                    {data.communities.map((community: CommunityType) => {
                        // console.log('community', community)
                        return <Community community={community} />
                    })}
                </Card>
            )}

            {searchValue === 'post' && data && (
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
