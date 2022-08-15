import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

import sourceTextReducer from '../features/randomtext/randomTextSlice'
import radioReducer from '../features/setup/setupSlice'
import scoreReducer from '../features/score/scoreSlice'
import timerReducer from '../features/timer/timerSlice'

export function makeStore() {
  return configureStore({
    reducer: { 
        source_text: sourceTextReducer,
        generate_or_paste: radioReducer,
        caluculate_score: scoreReducer,
        is_time_up: timerReducer
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