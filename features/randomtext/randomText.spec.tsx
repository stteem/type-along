import { render, screen } from '@testing-library/react'
import user from '@testing-library/user-event'
import { Provider } from 'react-redux'

const test_string = "this is a test string"

jest.mock('./randomTextAPI', () => ({
  fetchRandomText: () =>
    new Promise<{ data: string }>((resolve) =>
      setTimeout(() => resolve({ data: test_string }), 500)
    ),
}))

import { makeStore } from '../../app/store'
import RandomText from './randomText'

describe('<RandomText />', () => {
  it('renders the component', () => {
    const store = makeStore()

    render(
      <Provider store={store}>
        <RandomText />
      </Provider>
    )
    const main_element = screen.getByPlaceholderText('Generate random text by clicking the "Generate text" button below')
    const typing_area = screen.getByPlaceholderText('Type here to begin your challenge')
    const welcome = screen.getByText("Welcome to TypeAlong!")
    const generate = screen.getByText("Generate text")
    const score = screen.getByText("Score")
    const pick_time = screen.getByText("Pick time")

    expect(welcome).toBeInTheDocument()
    expect(main_element).toBeInTheDocument()
    expect(typing_area).toBeInTheDocument()

    expect(generate).toBeInTheDocument()
    expect(score).toBeInTheDocument()
    expect(pick_time).toBeInTheDocument()
  })

  it('fetch text from api', () => {
    const store = makeStore()

    render(
      <Provider store={store}>
        <RandomText />
      </Provider>
    )

    user.click(screen.getByRole('button', { name: /generate text/i }))

    expect(screen.getByText(test_string)).toBeInTheDocument()
  })

  it('shows copy paste input', () => {
    const store = makeStore()

    render(
      <Provider store={store}>
        <RandomText />
      </Provider>
    )

    user.click(screen.getByRole('radio', { name: /copy paste/i }))

    expect(screen.getByPlaceholderText('Copy and paste a text to start your typing challenge')).toBeInTheDocument()
  })

  // it('increments by amount', () => {
  //   const store = makeStore()

  //   render(
  //     <Provider store={store}>
  //       <RandomText />
  //     </Provider>
  //   )

  //   user.type(screen.getByLabelText(/set increment amount/i), '{backspace}5')
  //   user.click(screen.getByRole('button', { name: /add amount/i }))

  //   expect(screen.getByText('5')).toBeInTheDocument()
  // })

  // it('increments async', async () => {
  //   const store = makeStore()

  //   render(
  //     <Provider store={store}>
  //       <RandomText />
  //     </Provider>
  //   )

  //   user.type(screen.getByLabelText(/set increment amount/i), '{backspace}3')
  //   user.click(screen.getByRole('button', { name: /add async/i }))

  //   await expect(screen.findByText('3')).resolves.toBeInTheDocument()
  // })

  // it('increments if amount is odd', async () => {
  //   const store = makeStore()

  //   render(
  //     <Provider store={store}>
  //       <RandomText />
  //     </Provider>
  //   )

  //   user.click(screen.getByRole('button', { name: /add if odd/i }))

  //   expect(screen.getByText('0')).toBeInTheDocument()

  //   user.click(screen.getByRole('button', { name: /increment value/i }))
  //   user.type(screen.getByLabelText(/set increment amount/i), '{backspace}8')
  //   user.click(screen.getByRole('button', { name: /add if odd/i }))

  //   await expect(screen.findByText('9')).resolves.toBeInTheDocument()
  // })
})