import { combineReducers } from '@reduxjs/toolkit'
import template from './templateSlice'
import { TemplateType } from '@/@types/community'

const reducer = combineReducers({
    template,
})

export type CommunityState = {
    template: TemplateType
}

export * from './templateSlice'

export default reducer
