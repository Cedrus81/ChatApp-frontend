import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface styleState {
    theme: string
}

const initialState: styleState = {
    theme: 'light'
}

export const styleSlice = createSlice({
    name: 'style',
    initialState,
    reducers:{
        setTheme: (state, action: PayloadAction<string>) => {
            state.theme = action.payload
        }
    }
})

export default styleSlice.reducer