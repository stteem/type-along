import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import { Provider } from 'react-redux'
import { makeStore } from '../../app/store'
import RandomText from './randomText'

import { addRandomTextAsync, addCopyPasteText, SourceTextState } from './randomTextSlice'
import { checkRadio } from '../setup/setupSlice'

import configureStore from "redux-mock-store"
import thunk from 'redux-thunk'



const store = makeStore()
const mockStore = configureStore([thunk])

const test_string = "this is a test string"
const not_test_string = "this is not a test string"

jest.mock('./randomTextAPI', () => {
  return {
    async fetchRandomText() {
      return new Promise ((resolve) =>
        setTimeout(() => resolve({ very_long_sentence: test_string }), 500)
      )
    }
  }
})


describe('<RandomText />', () => {
  it('renders the component', () => {

    render(
      <Provider store={store}>
        <RandomText />
      </Provider>
    )

    expect(screen.getByRole("generate_text")).toBeInTheDocument()
    expect(screen.getByRole("type_text")).toBeInTheDocument()
    expect(screen.getByRole("generateBtn")).toBeInTheDocument()
    expect(screen.getByRole("reset-button")).toBeInTheDocument()
  })


  test("generates text from API call and types along", async () => {

    render(
      <Provider store={store}>
        <RandomText />
      </Provider>
    )

    const text_area = screen.getByRole("generate_text")
    const typed_text_input = screen.getByRole("type_text")

    expect(text_area).toHaveDisplayValue("")
    expect(typed_text_input).toHaveDisplayValue("")
  
    const addButton = screen.getByRole("generateBtn")
    const resetBtn = screen.getByRole("reset-button")

    act(() => {fireEvent.click(addButton)});

    await waitFor(() => {

      expect(text_area).toHaveDisplayValue(test_string)
      expect(store.getState().source_text.source).toEqual(test_string)

      let typed_str = ""
      for(let i = 0; i < test_string.length; i++){
        fireEvent.change(typed_text_input, { target: { value: typed_str += test_string[i] } })
      }
    })
    

    await waitFor(() => {
      expect(typed_text_input).toHaveDisplayValue(test_string)
      expect(store.getState().caluculate_score.typed_text).toEqual(test_string)
      expect(store.getState().caluculate_score.message.substring(0,1)).toEqual("C")
    })

    act(() => {fireEvent.click(resetBtn)});
    await waitFor(() => {
      expect(text_area).toHaveDisplayValue("")
      expect(typed_text_input).toHaveDisplayValue("")
      expect(store.getState().caluculate_score.typed_text).toEqual("")
      expect(store.getState().caluculate_score.message).toEqual("")
    })
  })


  test("copy paste text input", async () => {

    render(
      <Provider store={store}>
        <RandomText />
      </Provider>
    )

    act(() => {
      store.dispatch(checkRadio(false))
    })
    
    await waitFor(() => {
      let copy_paste_input = screen.getByRole("copy-paste")
      expect(copy_paste_input).toBeInTheDocument()
      expect(copy_paste_input).toHaveDisplayValue("")

      fireEvent.change(copy_paste_input, { target: { value: test_string } })
      expect(copy_paste_input).toHaveDisplayValue(test_string)
      expect(store.getState().source_text.source).toEqual(test_string)
    })

    act(() => {
      fireEvent.click(screen.getByRole("reset-button"))
    })
    await waitFor(() => {
      expect(screen.getByRole("copy-paste")).toHaveDisplayValue("")
      expect(store.getState().source_text.source).toEqual("")
    })
  })


  test.only("types in copy/paste input field and types along", async () => {

    render(
      <Provider store={store}>
        <RandomText />
      </Provider>
    )

    act(() => {
      store.dispatch(checkRadio(false))
    })

    const copy_paste_input = screen.getByRole("copy-paste")
    const typed_text_input = screen.getByRole("type_text")
    expect(copy_paste_input).toHaveDisplayValue("")
    expect(typed_text_input).toHaveDisplayValue("")

    let str = ""
    for(let i = 0; i < test_string.length; i++){
      fireEvent.change(copy_paste_input, { target: { value: str += test_string[i] } })
    }

    await waitFor(() => expect(copy_paste_input).toHaveDisplayValue(test_string))

    let typed_str = ""
    for(let i = 0; i < test_string.length; i++){
      fireEvent.change(typed_text_input, { target: { value: typed_str += test_string[i] } })
    }

    await waitFor(() => {
      expect(typed_text_input).toHaveDisplayValue(test_string)
      expect(store.getState().caluculate_score.typed_text).toEqual(test_string)
      expect(store.getState().caluculate_score.message.substring(0,1)).toEqual("C")
    })

    fireEvent.click(screen.getByRole("reset-button"))

    await waitFor(() => {
      expect(copy_paste_input).toHaveDisplayValue("")
      expect(typed_text_input).toHaveDisplayValue("")
      expect(store.getState().caluculate_score.typed_text).toEqual("")
      expect(store.getState().caluculate_score.message).toEqual("")
    })
  })

})


describe("Thunks", () => {
  it("checks action types with mock function", async () => {

    const dispatch = jest.fn()
    const state: SourceTextState = {
      source: "", status: "idle"
    }
    const thunk = addRandomTextAsync()
    await thunk(dispatch, () => state, undefined);
    const { calls } = dispatch.mock;
    
    expect(calls).toHaveLength(2)
    expect(calls[0][0].type).toEqual('randomtext/fetchRandomText/pending')
    expect(calls[1][0].type).toEqual('randomtext/fetchRandomText/fulfilled')
    expect(calls[1][0].payload).toEqual( test_string )

  })

  it("checks action types with redux mock store", async () => {

    const store = mockStore({source_text: {source: "", status: "idle"}})

    await store.dispatch(addRandomTextAsync() as any)
    const actions = store.getActions()

    expect(actions).toHaveLength(2)
    expect(actions[0].type).toEqual('randomtext/fetchRandomText/pending')
    expect(actions[1].type).toEqual('randomtext/fetchRandomText/fulfilled')
    expect(actions[1].payload).toEqual( test_string )
  })
})
