import { createSlice } from '@reduxjs/toolkit'

const AuthSlice = createSlice({
    name: 'auth',
    initialState: {
        authData: null,
        error: false,
        alredyAuth: false,
        AuthStatus: ''
    },
    reducers: {
        addAuth: (state, action) => {
            state.authData = action.payload
        },
        errorAuth: (state, action) => {
            state.error = action.payload
        },
        againAuth: (state, action) => {
            state.alredyAuth = action.payload
        },
        authStatus: (state, action) => {
            state.AuthStatus = action.payload
        }
    }
})


export default AuthSlice.reducer

export const { addAuth, errorAuth, againAuth, authStatus } = AuthSlice.actions