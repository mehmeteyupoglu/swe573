import { useState, useEffect, useRef } from 'react'

const useFetchData = <T>(
    apiFunc: (...args: any[]) => Promise<T>,
    args: any[]
): T | null => {
    const [data, setData] = useState<T | null>(null)
    const apiFuncRef = useRef(apiFunc)
    const argsRef = useRef(args)

    useEffect(() => {
        apiFuncRef.current = apiFunc
        argsRef.current = args
    }, [apiFunc, args])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiFuncRef.current(...argsRef.current)
                setData(response)
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }

        fetchData()
    }, [])

    return data
}

export default useFetchData