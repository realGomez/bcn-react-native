import { createSlice } from '@reduxjs/toolkit'

export const checkoutSlice = createSlice({
    name: 'checkout',
    initialState: {
        shippingAddress: null,
        editAddress: null,

    },
    stepCodes: ['shipping', 'payment'],
    validStep: '',
    submitStep: '',
    reducers: {
        setShippingAddress: (state, action) => {
            state.shippingAddress = action.payload
        },
        setEditAddress: (state, action) => {
            state.editAddress = action.payload
        },
        setValidStep: (state, action) => {
            state.validStep = action.payload
        },
        setSubmitStep: (state, action) => {
            state.submitStep = action.payload
        },

    },
})

// Action creators are generated for each case reducer function
export const { setShippingAddress, setEditAddress } = checkoutSlice.actions

export default checkoutSlice.reducer