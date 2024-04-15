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
    templateDialogOpen: false,
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
        toggleTemplateDialog(state) {
            state.templateDialogOpen = !state.templateDialogOpen
        },
    },
})

export const { setTemplate, addTemplate, toggleTemplateDialog } =
    templateSlice.actions
export default templateSlice.reducer
