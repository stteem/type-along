import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { AppState } from '../../app/store'

export interface ScoreState {
  total: number
}

const initialState: ScoreState = {
  total: 0
}


export const scoreSlice = createSlice({
  name: 'caluculate_score',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    textLen: (state, action: PayloadAction<number>) => {
      state.total = action.payload
    },
  }
})

export const { textLen } = scoreSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectTotalScore = (state: AppState) => state.caluculate_score.total



export default scoreSlice.reducer