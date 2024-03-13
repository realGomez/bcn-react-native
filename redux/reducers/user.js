import { createSlice } from '@reduxjs/toolkit'
import { saveStoreItemAsync, getStoreItemAsync } from '../../utils/secureStore';
const token = getStoreItemAsync('token');


export const userSlice = createSlice({
    name: 'user',
    initialState: {
        token: null,
        userInfo: {},
        isSignedIn: false
    },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload
            state.isSignedIn = true

        },
        clearToken: (state) => {
            state.token = null
            state.isSignedIn = false,
            state.userInfo = {},
            isSignedIn = false
        },
        setUserInfo: (state, action) => {
            state.userInfo = action.payload
        },
        clearUserInfo: (state) => {
            state.userInfo = {}
        }

    },
})

// Action creators are generated for each case reducer function
export const { setToken, clearToken, setUserInfo, clearUserInfo } = userSlice.actions

export default userSlice.reducer