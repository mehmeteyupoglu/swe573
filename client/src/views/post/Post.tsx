import { TemplateResponse } from '@/@types/community'
import { apiGetCommunityTemplates } from '@/services/CommunityService'
import { useAppSelector } from '@/store'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import MapTemplates from './components/MapTemplates'

export default function Post() {
    const [templates, setTemplates] = useState<TemplateResponse[]>([])
    const fetchTrigger = useAppSelector(
        (state) => state.community.community.fetchTrigger
    )

    const { id } = useParams<{ id: string }>()

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const templates = await apiGetCommunityTemplates(
                    String(id) ?? ''
                )
                if (templates.status === 200) {
                    setTemplates(templates.data as TemplateResponse[])
                }
                // fetch templates data
                console.log('fetching templates')
            } catch (error) {
                console.error('Error fetching templates', error)
            }
        }

        fetchMembers()
    }, [fetchTrigger])
    return (
        <div>
            <MapTemplates templates={templates} />
        </div>
    )
}
