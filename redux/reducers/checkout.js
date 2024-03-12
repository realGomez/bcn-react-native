import { createSlice } from '@reduxjs/toolkit'

export const checkoutSlice = createSlice({
    name: 'checkout',
    initialState: {
        shippingAddress: null,
        editAddress: null,
        stepCodes: ['shipping', 'payment'],
        validStep: '',
        submitStep: '',
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
            const index = stepCodes.indexOf(code)

            // if (index == -1) {
            //     state.validStep = stepCodes[0]
            // } else if (index == stepCodes.length - 1) {
            //     state.validStep = ''
            // } else {
            //     state.validStep = stepCodes[index + 1]
            // }

            state.validStep = code

        },
        setNextSubmitStep: (state, action) => {

            const { code, stepCodes } = action.payload;
            const index = stepCodes.indexOf(code)

            // if (index == -1) {
            //     state.submitStep = stepCodes[0]
            // } else if (index == stepCodes.length - 1) {
            //     state.submitStep = ''
            // } else {
            //     state.submitStep = stepCodes[index + 1]
            // }
            state.submitStep = code
        },

    },
})

// Action creators are generated for each case reducer function
export const { setShippingAddress, setEditAddress, setNextValidStep, setNextSubmitStep } = checkoutSlice.actions

export default checkoutSlice.reducer