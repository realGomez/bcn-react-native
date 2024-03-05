import { createSlice } from '@reduxjs/toolkit'

export const checkoutSlice = createSlice({
    name: 'checkout',
    initialState: {
        shippingAddress: null,
        editAddress: null,

    },
    reducers: {
        setShippingAddress: (state, action) => {
            state.shippingAddress = action.payload
        },
        setEditAddress: (state, action) => {
            state.editAddress = action.payload
        },

    },
})

// Action creators are generated for each case reducer function
export const { setShippingAddress, setEditAddress } = checkoutSlice.actions

export default checkoutSlice.reducer