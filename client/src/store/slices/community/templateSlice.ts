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
    },
})

export const { setTemplate } = templateSlice.actions
export default templateSlice.reducer
