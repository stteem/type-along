import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

import randomTextReducer from '../features/randomtext/randomTextSlice'
import radioReducer from '../features/setup/setupSlice'
import scoreReducer from '../features/score/scoreSlice'

export function makeStore() {
  return configureStore({
    reducer: { 
        random_text: randomTextReducer,
        generate_text: radioReducer,
        caluculate_score: scoreReducer
    },
  })
}

const store = makeStore()

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>

export default store