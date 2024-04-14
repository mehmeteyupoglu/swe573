import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SLICE_BASE_NAME } from './constants'
import { TemplateType } from '@/@types/community'

const initialState: TemplateType = {
    name: '',
    description: '',
    fields: [
        {
            field_name: '',
            field_type: '',
        },
    ],
}

const templateSlice = createSlice({
    name: `${SLICE_BASE_NAME}/template`,
    initialState,
    reducers: {
        setTemplate(state, action: PayloadAction<TemplateType>) {
            Object.assign(state, action.payload)
        },

        addTemplate(
            state,
            action: PayloadAction<{
                templateName: string
                templateDescription: string
                fields: { name: string; type: string }[]
            }>
        ) {
            console.log(action.payload)
            const { templateName, templateDescription, fields } = action.payload
            state.name = templateName
            state.description = templateDescription
            state.fields = [
                {
                    field_name: fields[0].name,
                    field_type: fields[0].type,
                },
            ]
        },
    },
})

export const { setTemplate, addTemplate } = templateSlice.actions
export default templateSlice.reducer
