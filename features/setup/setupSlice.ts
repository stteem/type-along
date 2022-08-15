import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { AppState } from '../../app/store'

export interface RadioState {
  generate: boolean
}

const initialState: RadioState = {
  generate: true
}


export const radioSlice = createSlice({
  name: 'generate_text',
  initialState,
  reducers: {
    checkRadio: (state, action: PayloadAction<boolean>) => {
      state.generate = action.payload
    },
  }
})

export const { checkRadio } = radioSlice.actions


export const selectRadio = (state: AppState) => state.generate_or_paste.generate



export default radioSlice.reducer