import { createSlice } from '@reduxjs/toolkit'

export const checkoutSlice = createSlice({
    name: 'checkout',
    initialState: {
        shippingAddress: null,
        editAddress: null,
        stepCodes: ['shipping', 'payment'],
        validStep: '',
        submitStep: '',
        errorStep: ''
    },
    reducers: {
        setShippingAddress: (state, action) => {
            state.shippingAddress = action.payload
        },
        setEditAddress: (state, action) => {
            state.editAddress = action.payload
        },
        setNextValidStep: (state, action) => {

            const { code, stepCodes } = action.payload;

            state.validStep = code

        },
        setNextSubmitStep: (state, action) => {

            const { code, stepCodes } = action.payload;

            state.submitStep = code
        },
        setErrorStep: (state, action) => {
            const { code, stepCodes } = action.payload;
            state.errorStep = code
        },

    },
})

// Action creators are generated for each case reducer function
export const { setShippingAddress, setEditAddress, setNextValidStep, setNextSubmitStep, setErrorStep } = checkoutSlice.actions

export default checkoutSlice.reducer