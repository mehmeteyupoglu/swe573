import { useRef } from 'react'
import IngredientTableSearch from './account/Settings/components/Ingredients/components/IngredientTableSearch'

const Search = () => {
    const inputRef = useRef<HTMLInputElement>(null)
    // const tableData = useAppSelector((state) => state.crmMeals.data.tableData)

    const handleInputChange = (val: string) => {
        console.log('val', val)
        return
    }
    return (
        <div className="">
            <IngredientTableSearch
                ref={inputRef}
                onInputChange={handleInputChange}
            />
        </div>
    )
}

export default Search
