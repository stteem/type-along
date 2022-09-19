import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { AppState, AppThunk } from '../../app/store'



export interface ScoreState {
  total: number,
  score: number,
  typed_text: string,
  message: string
}

const initialState: ScoreState = {
  total: 0,
  score: 0,
  typed_text: '',
  message: ''
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
    challengeScore: (state, action: PayloadAction<number>) => {
      state.score += action.payload
    },
    storeTypedText: (state, action: PayloadAction<string>) => {
      state.typed_text = action.payload
    },
    resetScore: (state) => {
      state.score = 0
    },
    setMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload
    },
    clearMessage: (state) => {
      state.message = ""
    },
  }
})

export const { textLen, storeTypedText, challengeScore, resetScore, setMessage, clearMessage } = scoreSlice.actions


export const selectTotalScore = (state: AppState) => state.caluculate_score.total
export const selectChallengeScore = (state: AppState) => state.caluculate_score.score
export const selectTypedText = (state: AppState) => state.caluculate_score.typed_text
export const selectRandomText = (state: AppState) => state.source_text.source
export const selectMessage = (state: AppState) => state.caluculate_score.message


export const computeScore = (): AppThunk => (dispatch, getState) => {
  const getGeneratedText = selectRandomText(getState())
  const getTypedText = selectTypedText(getState())
  if (getTypedText.length > 0) {

    let getGeneratedTextIndex = getGeneratedText[getTypedText.length - 1]
    let currentTypedText = getTypedText[getTypedText.length - 1]
    if(getGeneratedTextIndex === currentTypedText){
      let score = 1
      dispatch(challengeScore(score))
    }

  }
}



export default scoreSlice.reducer