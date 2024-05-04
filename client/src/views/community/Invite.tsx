import { useRef, useState } from 'react'
import IngredientTableSearch from '../account/Settings/components/Ingredients/components/IngredientTableSearch'
import { SearchType } from '@/@types/search'
import { Button, Card } from '@/components/ui'
import { UserResponseType, UserType } from '@/@types/user'
import { apiFetchNonMembers } from '@/services/CommunityService'
import { useParams } from 'react-router-dom'

const Invite = () => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [data, setData] = useState<any>(null)

    const { id } = useParams<{ id: string }>()

    const handleInputChange = async (val: string) => {
        const query = val

        try {
            const response = await apiFetchNonMembers(id ?? '', query)
            console.log('response', response.data)
            setData(response.data as SearchType)
            // Handle the response data here
        } catch (error) {
            // Handle any errors here
        }
    }

    return (
        <div className="">
            <IngredientTableSearch
                ref={inputRef}
                onInputChange={handleInputChange}
            />
            {data &&
                inputRef.current !== null &&
                inputRef.current.value !== '' && (
                    <Card>
                        <h5>Users:</h5>
                        {data.map((user: UserResponseType) => {
                            const { id, firstname, lastname, username } = user
                            return (
                                <div key={id} className="mt-5">
                                    <p>
                                        {firstname} {lastname}{' '}
                                        <span className="ml-5 italic">
                                            {username}
                                        </span>
                                        <Button
                                            className="bg-blue-500 text-white ml-5"
                                            size="xs"
                                            variant="solid"
                                            onClick={() =>
                                                console.log('Invite user:', id)
                                            }
                                        >
                                            Invite
                                        </Button>
                                    </p>
                                </div>
                            )
                        })}
                    </Card>
                )}
        </div>
    )
}

export default Invite
