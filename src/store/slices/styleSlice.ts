import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { storageService } from "../../services/local-storage.service";
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
            storageService.setItem('theme', state.theme)
            document.querySelector('body')?.classList.toggle(state.theme)
        },
        initialTheme: (state =>{
            state.theme = storageService.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
            if (!storageService.getItem('theme')) storageService.setItem('theme', state.theme)
            document.querySelector('body')?.classList.toggle(state.theme)
        })
    }
})

export const { setTheme, initialTheme } = styleSlice.actions


export default styleSlice.reducer