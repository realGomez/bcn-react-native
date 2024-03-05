import { createSlice } from '@reduxjs/toolkit'

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        store: {}
    },
    reducers: {
        setStore: (state, action) => {
            state.store = action.payload
        },
        clearStore: (state) => {
            state.store = {}
        }

    },
})

// Action creators are generated for each case reducer function
export const { setStore, clearStore } = appSlice.actions

export default appSlice.reducer