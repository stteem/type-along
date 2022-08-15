import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { AppState } from '../../app/store'
import { fetchRandomText } from './randomTextAPI'

export interface SourceTextState {
  source: string;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: SourceTextState = {
  source: '',
  status: 'idle',
}


export const addRandomTextAsync = createAsyncThunk(
  'randomtext/fetchRandomText',
  async () => {
    const response = await fetchRandomText()
    // The value we return becomes the `fulfilled` action payload
    return response.very_long_sentence
  }
)

export const textSlice = createSlice({
  name: 'randomtext',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    resetTextArea: (state) => {
      state.source = ''
    },
    addCopyPasteText: (state, action: PayloadAction<string>) => {
      state.source = action.payload
    }
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(addRandomTextAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(addRandomTextAsync.rejected, (state) => {
        state.status = 'idle'
      })
      .addCase(addRandomTextAsync.fulfilled, (state, action) => {
        state.source = action.payload
        state.status = 'idle'
      })
  },
})

export const { resetTextArea, addCopyPasteText } = textSlice.actions


export const selectText = (state: AppState) => state.source_text.source

export const selectStatus = (state: AppState) => state.source_text.status


export default textSlice.reducer