import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { AppState, AppThunk } from '../../app/store'

interface StringArray {
  [index: number]: string;
}

export interface ScoreState {
  total: number,
  score: number,
  typed_text: string,
  hash: StringArray
}

const initialState: ScoreState = {
  total: 0,
  score: 0,
  typed_text: '',
  hash: {}
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
    populateHash: (state, action: PayloadAction<StringArray>) => {
      state.hash = action.payload
    },
    resetScore: (state) => {
      state.score = 0
    },
  }
})

export const { textLen, storeTypedText, populateHash, challengeScore, resetScore } = scoreSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectTotalScore = (state: AppState) => state.caluculate_score.total
export const selectChallengeScore = (state: AppState) => state.caluculate_score.score
export const selectTypedText = (state: AppState) => state.caluculate_score.typed_text
export const selectRandomText = (state: AppState) => state.random_text.result


export const populateHashtable = (): AppThunk => (dispatch, getState) => {
  const getGeneratedText = selectRandomText(getState())
  if (getGeneratedText.length > 0) {
    let hashtable: StringArray = {};
    for(let i = 0; i < getGeneratedText.length; i++){
      hashtable[i] = getGeneratedText[i]
    }
    dispatch(populateHash(hashtable))
  }
}


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