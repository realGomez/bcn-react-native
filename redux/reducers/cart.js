import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartId: null,
        cartInfo: {},
        total_quantity: 0
    },
    reducers: {
        setCartId: (state, action) => {
            state.cartId = action.payload
        },
        clearCartId: (state) => {
            state.cartId = null
        },
        setCartDetail: (state, action) => {
            state.cartDetail = action.payload
        },
        clearCartDetail: (state) => {
            state.cartDetail = {}
        },
        setTotalQuantity: (state, action) => {
            state.total_quantity = action.payload
        }

    },
})

// Action creators are generated for each case reducer function
export const { setCartId, clearCartId, setCartDetail, clearCartDetail,setTotalQuantity } = cartSlice.actions

export default cartSlice.reducer