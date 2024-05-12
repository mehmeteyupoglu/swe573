import { useState, useEffect } from 'react'
import Input from '@/components/ui/Input'
import TextArea from '@/components/ui/TextArea'

const useFieldToComponent = (fieldType: string) => {
    const [Component, setComponent] = useState<React.ComponentType<any> | null>(
        null
    )

    if (fieldType === 'geolocation') {
        // Geolocation API
        if (navigator.geolocation) {
            // what to do if supported
            navigator.geolocation.getCurrentPosition((position) => {
                console.log('Latitude: ', position.coords.latitude)
                console.log('Longitude: ', position.coords.longitude)
            })
        } else {
            // display an error if not supported
            console.error('Geolocation is not supported by this browser.')
        }
    }

    useEffect(() => {
        const componentMap: { [key: string]: React.ComponentType<any> } = {
            text: Input,
            number: Input,
            textarea: TextArea,
            image: Input,
            geolocation: Input,
        }

        setComponent(componentMap[fieldType] || Input)
    }, [fieldType])

    return Component
}

export default useFieldToComponent
