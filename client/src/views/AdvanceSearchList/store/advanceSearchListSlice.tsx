import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiAdvanceSearch } from '@/services/SearchService'
import type { TableQueries } from '@/@types/common'

type AdvanceSearch = {
    id: string
    name: string
    advanceSearchCode: string
    img: string
    dataTypes: string
    price: number
    stock: number
    status: number
}

type AdvanceSearchList = AdvanceSearch[]

type GetSalesAdvanceSearchResponse = {
    data: AdvanceSearch
    total: number
}

type FilterQueries = {
    name: string
    dataTypes: string[]
    status: number[]
    advanceSearchStatus: number
}

export type SalesAdvanceSearchListState = {
    loading: boolean
    deleteConfirmation: boolean
    selectedAdvanceSearch: string
    tableData: TableQueries
    filterData: FilterQueries
    advanceSearchList: AdvanceSearch[]
}

type GetSalesAdvanceSearchRequest = TableQueries & {
    filterData?: FilterQueries
}

export const SLICE_NAME = 'advanceSearchList'

export const getAdvanceSearch = createAsyncThunk(
    SLICE_NAME + '/getAdvanceSearch',
    async (data: GetSalesAdvanceSearchRequest) => {
        const response = await apiAdvanceSearch<
            GetSalesAdvanceSearchResponse,
            GetSalesAdvanceSearchRequest
        >(data)
        return response.data
    }
)

export const deleteAdvanceSearch = createAsyncThunk(
    SLICE_NAME + '/deleteAdvanceSearch',
    async (id: string) => {
        console.log('id', id)
    }
)

export const initialTableData: TableQueries = {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
    query: '',
    sort: {
        order: '',
        key: '',
    },
}

const initialState: SalesAdvanceSearchListState = {
    loading: false,
    deleteConfirmation: false,
    selectedAdvanceSearch: '',
    advanceSearchList: [],
    tableData: initialTableData,
    filterData: {
        name: '',
        dataTypes: ['bags', 'cloths', 'devices', 'shoes', 'watches'],
        status: [0, 1, 2],
        advanceSearchStatus: 0,
    },
}

const advanceSearchListSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        updateAdvanceSearchList: (state, action) => {
            state.advanceSearchList = action.payload
        },
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        setFilterData: (state, action) => {
            state.filterData = action.payload
        },
        toggleDeleteConfirmation: (state, action) => {
            state.deleteConfirmation = action.payload
        },
        setSelectedAdvanceSearch: (state, action) => {
            state.selectedAdvanceSearch = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAdvanceSearch.fulfilled, (state, action) => {
                console.log('action.payload', action.payload)
                state.advanceSearchList = action.payload.data // Wrap action.payload.data in an array
                state.tableData.total = action.payload.total
                state.loading = false
            })
            .addCase(getAdvanceSearch.pending, (state) => {
                state.loading = true
            })
    },
})

export const {
    updateAdvanceSearchList,
    setTableData,
    setFilterData,
    toggleDeleteConfirmation,
    setSelectedAdvanceSearch,
} = advanceSearchListSlice.actions

export default advanceSearchListSlice.reducer
