import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { AppState } from '../../app/store'

export interface RadioState {
  generate: string
}

const initialState: RadioState = {
  generate: '1'
}


export const radioSlice = createSlice({
  name: 'generate_text',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    checkRadio: (state, action: PayloadAction<string>) => {
      state.generate = action.payload
    },
  }
})

export const { checkRadio } = radioSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectRadio = (state: AppState) => state.generate_text.generate



export default radioSlice.reducer