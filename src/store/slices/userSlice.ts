import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { userService } from '../../services/user.service';
import { User } from '../../types'
import { storageService } from '../../services/local-storage.service';
import type { RootState } from '../index'
import { SignupDto } from '../../dto';


interface userState {
    loggedInUser: User | null;
}


const initialState: userState = {
    loggedInUser: null,
}

export const signup = createAsyncThunk('signup', (dto: SignupDto) => {
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
        builder.addCase(signup.fulfilled, setLoggedInUser)

        builder.addCase(signin.fulfilled, setLoggedInUser)

        // builder.addCase(signin.rejected, (state, action) => {
        //     const { status } = JSON.parse(action.payload as string)
        //     if(status === 500) {
        //         state.errorMsg = 'User not found: The credentials might be incorrect'
        //     }
        // })
        builder.addCase(logout.fulfilled, state => {
            storageService.removeItem('loggedInUser')
            state.loggedInUser = null
        })
    },
    
})

export default userSlice.reducer

function setLoggedInUser(state: userState, {payload}: PayloadAction<User>){
    storageService.setItem('loggedInUser', payload)
    state.loggedInUser = payload
}