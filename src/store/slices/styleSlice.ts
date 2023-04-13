import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { storageService } from "../../services/local-storage.service";

const THEME_KEY = 'ChatApp_theme'

interface styleState {
    theme: string
}

const initialState: styleState = {
    theme: ''
}

export const styleSlice = createSlice({
    name: 'style',
    initialState,
    reducers:{
        setTheme: (state, action: PayloadAction<string>) => {
            document.querySelector('body')?.classList.toggle(state.theme as string)
            state.theme = action.payload
            storageService.setItem(THEME_KEY, state.theme)
            document.querySelector('body')?.classList.toggle(state.theme)
        },
        initialTheme: (state =>{
            //todo don't toggle, it can cause either both themes or none in some edge cases
            state.theme = storageService.getItem(THEME_KEY) || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
            if (!storageService.getItem(THEME_KEY)) storageService.setItem(THEME_KEY, state.theme)
            document.querySelector('body')?.classList.toggle(state.theme)
        })
    }
})

export const { setTheme, initialTheme } = styleSlice.actions


export default styleSlice.reducer