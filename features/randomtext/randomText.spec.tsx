import { render, screen } from '@testing-library/react'
import user from '@testing-library/user-event'
import { Provider } from 'react-redux'

const test_string = "this is a test string"
jest.mock('./randomTextAPI', () => ({
  fetchCount: () =>
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

    expect(screen.getByText('Welcome to TypeAlong!')).toBeInTheDocument()
  })

})