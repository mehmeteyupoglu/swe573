import { useRef, useState, SyntheticEvent, useEffect, useCallback } from 'react'
import { apiAdvanceSearch, apiSearch } from '@/services/SearchService'
import { CommunityType, DataTypeResponse } from '@/@types/community'
import Community from '../search/components/Community'
import { Button, Card, Checkbox, Radio } from '@/components/ui'
import Post from './components/Post'
import { PostData } from '@/@types/post'
import TableSearch from '../account/Settings/components/Search/TableSearch'
import { apiGetDataTypes } from '@/services/CommunityService'

const Search = () => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [data, setData] = useState<any>(null)
    const [checkboxList, setCheckboxList] = useState<(string | number)[]>([])

    const onCheckboxChange = (
        options: (string | number)[],
        e: SyntheticEvent
    ) => {
        setCheckboxList(options)
    }
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
    >(['text'])

    useEffect(() => {
        const fetchDataType = async () => {
            const resp = await apiGetDataTypes()
            if (resp.status == 200) {
                setDataTypes(
                    (resp.data as DataTypeResponse['data_types']) || []
                )
            }
        }
        fetchDataType()
    }, [])

    const [searchType, setSearchType] = useState('community')

    const onChange = (val: string) => {
        setSearchType(val)
    }

    const handleInputChange = useCallback(
        async (val: string) => {
            const query = val

            try {
                console.log({
                    query,
                    checkboxList,
                    searchType,
                })
                const _response = await apiAdvanceSearch({
                    query,
                    dataTypes: checkboxList,
                    searchType,
                })

                setData(_response.data)
                // Handle the response data here
            } catch (error) {
                // Handle any errors here
            }
        },
        [checkboxList, searchType]
    )

    useEffect(() => {
        handleInputChange(inputRef.current?.value || '')
    }, [handleInputChange])

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
                        value={searchType}
                        onChange={onChange}
                        className="mr-2 h-10 flex items-center"
                    >
                        <Radio value={'community'} className="ml-2">
                            Community
                        </Radio>
                        <Radio value={'post'}>Post</Radio>
                        <Radio value={'user'}>User</Radio>
                    </Radio.Group>
                </div>
            </div>

            {searchType === 'post' && (
                <Checkbox.Group
                    value={checkboxList}
                    onChange={onCheckboxChange}
                >
                    {dataTypes.map((dataType) => {
                        return (
                            <Checkbox
                                className="mb-3"
                                name="dataTypes"
                                value={dataType}
                            >
                                {dataType.toLocaleUpperCase()}
                            </Checkbox>
                        )
                    })}
                </Checkbox.Group>
            )}

            {searchType == 'community' && data && (
                <Card>
                    <h5>Communities:</h5>
                    {data.data.map((community: CommunityType) => {
                        return <Community community={community} />
                    })}
                </Card>
            )}

            {searchType === 'post' && data && (
                <Card className="mt-5">
                    <h5>Posts:</h5>
                    {data.data.map((post: PostData) => {
                        return <Post post={post} />
                    })}
                </Card>
            )}
        </div>
    )
}

export default Search
