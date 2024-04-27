import { useState, useEffect } from 'react'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'

const useFieldToComponent = (fieldType: string) => {
    const [Component, setComponent] = useState<React.ComponentType<any> | null>(
        null
    )

    useEffect(() => {
        const componentMap: { [key: string]: React.ComponentType<any> } = {
            text: Input,
            number: Input,
        }

        setComponent(componentMap[fieldType] || Input)
    }, [fieldType])

    return Component
}

export default useFieldToComponent
