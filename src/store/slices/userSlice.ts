import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { userService } from '../../services/user.service';
import { User } from '../../types'

import type { RootState } from '../index'


interface userState {
    loggedInUser: User | null;
    errorMsg: string
}

const initialState: userState = {
    loggedInUser: null,
    errorMsg: ''
}

export const signup = createAsyncThunk('signup', (dto: User, {rejectWithValue}) => {
    try{
        return userService.signup(dto)
    } catch (err) {
        throw new Error('Error, could not create user')
    }
})

export const signin = createAsyncThunk('signin', async (dto: {email: string, password: string}, {rejectWithValue}) => {
    try{
        return await userService.signin(dto)
    } catch (err) {
        return rejectWithValue(JSON.stringify(err))
    }
})

export const logout = createAsyncThunk('logout', () =>{
    return userService.logout()
})

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(signup.fulfilled, (state, { payload }) => {
            console.log('signup fulfilled:', payload)
        })

        builder.addCase(signin.fulfilled, (state, { payload }) => {
            console.log('signin fulfilled:', payload)
        })
        builder.addCase(signin.rejected, (state, action) => {
            const { status } = JSON.parse(action.payload as string)
            if(status === 500) {
                state.errorMsg = 'User not found: The credentials might be incorrect'
            }
        })
    },
})

export default userSlice.reducer