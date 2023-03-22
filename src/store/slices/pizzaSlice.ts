import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../index'

// Define a type for the slice state
interface PizzaState {
  tosafot: string[]
}

// Define the initial state using that type
const initialState: PizzaState = {
  tosafot: []
}

export const pizzaSlice = createSlice({
  name: 'pizza',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addZeitim: (state) => {
      state.tosafot.push('zeitim')
    },
    removeZeitim: (state) => {
      state.tosafot.pop()
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload
    // },
  },
})

export const { addZeitim, removeZeitim } = pizzaSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectTosafot = (state: RootState) => state.pizza.tosafot

export default pizzaSlice.reducer