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
            document.querySelector('body')?.classList.toggle(state.theme)
            state.theme = action.payload
            document.querySelector('body')?.classList.toggle(state.theme)
        },
        initialTheme: (state =>{
           state.theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
        })
    }
})

export const { setTheme, initialTheme } = styleSlice.actions


export default styleSlice.reducer