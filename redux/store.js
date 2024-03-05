import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/user'
import cartReducer from './reducers/cart'
import appReducer from './reducers/app'
import checkoutReducer from './reducers/checkout'



export default configureStore({
    reducer: {
        user: userReducer,
        cart:cartReducer,
        app:appReducer,
        checkout:checkoutReducer
    },
})