import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
  value: number | null
}

const initialState: CounterState = {
  value: null,
}

export const calcSlice = createSlice({
  name: 'calc',
  initialState,
  reducers: {
    multi: (state, action: PayloadAction<{firstNum: number, secondNum: number}>) => {
        const multiplied = action.payload.firstNum * action.payload.secondNum;
        state.value = multiplied;
  }}
})

// Action creators are generated for each case reducer function
export const { multi } = calcSlice.actions

export default calcSlice.reducer