import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { AppState } from '../../app/store'

export interface TimerState {
  time_up: string;
  stop_time: string;
  custom: object;
  preset: object;
}

const initialState: TimerState = {
  time_up: "no",
  stop_time: "",
  custom: {
    custom_time: 0,
    custom_seconds: 0
  },
  preset: {
    preset_time: 0,
    preset_seconds: 0
  }
}


export const timerSlice = createSlice({
  name: 'check_timer',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    isTimeup: (state, action: PayloadAction<string>) => {
      state.time_up = action.payload
    },
    stopTime: (state, action: PayloadAction<string>) => {
        state.stop_time = action.payload
    },
    addCustomTime: (state, action: PayloadAction<object>) => {
        state.custom = action.payload
    },
    addPresetTime: (state, action: PayloadAction<object>) => {
        state.preset = action.payload
    },
  }
})

export const { isTimeup, addCustomTime, addPresetTime, stopTime } = timerSlice.actions


export const selectTimer = (state: AppState) => state.is_time_up.time_up
export const selectStopTimer = (state: AppState) => state.is_time_up.stop_time


export default timerSlice.reducer