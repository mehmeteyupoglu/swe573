import { useRef, useState } from 'react'
import IngredientTableSearch from '../account/Settings/components/Ingredients/components/IngredientTableSearch'
import { SearchType } from '@/@types/search'
import { Card } from '@/components/ui'
import { apiSearchUsers } from '@/services/UserService'

const Invite = () => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [data, setData] = useState<any>(null)

    const handleInputChange = async (val: string) => {
        const query = val

        try {
            const response = await apiSearchUsers(query)
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
            {data && data.users && (
                <Card>
                    <h5>Users:</h5>
                </Card>
            )}
        </div>
    )
}

export default Invite
