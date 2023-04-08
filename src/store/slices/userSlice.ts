import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { userService } from '../../services/user.service';
import { User } from '../../types'
import { storageService } from '../../services/local-storage.service';
import type { RootState } from '../index'
import { SignupDto, UpdateUserDto } from '../../dto';

const USER_KEY = 'ChatApp_loggedInUser'

interface userState {
    loggedInUser: User | null;
}


const initialState: userState = {
    loggedInUser: storageService.getItem(USER_KEY),
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

export const updateUser = createAsyncThunk('updateUser', async (dto: UpdateUserDto, {rejectWithValue} )=>{
    if (!dto.id) return rejectWithValue('Had an issue updating the user, id not found..')
    return await userService.updateUser(dto)
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

        builder.addCase(updateUser.fulfilled, setLoggedInUser)

        builder.addCase(logout.fulfilled, state => {
            storageService.removeItem(USER_KEY)
            state.loggedInUser = null
        })
    },
    
})

export default userSlice.reducer

function setLoggedInUser(state: userState, {payload}: PayloadAction<User>){
    storageService.setItem(USER_KEY, payload)
    state.loggedInUser = payload
}