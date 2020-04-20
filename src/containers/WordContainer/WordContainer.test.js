import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { cleanup, render as rtlRender } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { ThemeProvider } from 'styled-components';
import rootReducer from '../../reducers';
import theme from '../../styles/theme';
import WordContainer from './WordContainer';

const render = (ui, initialStore = {}, options = {}) => {
  const store = createStore(rootReducer, initialStore, applyMiddleware(thunk));
  const Providers = ({ children }) => (
    <Provider store={store}>
      <MemoryRouter>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </MemoryRouter>
    </Provider>
  );

  return rtlRender(ui, { wrapper: Providers, ...options });
};

afterEach(cleanup);

test("it renders a message when the user's word collection is empty", async () => {
  const { getByText } = render(<WordContainer />);

  expect(getByText('Woords')).toBeInTheDocument();
  expect(
    getByText('You currently have no Woords. Add a few to get started!')
  ).toBeInTheDocument();
});

test('it renders words when receiving userWords props', async () => {
  const { getByText } = render(<WordContainer />, {
    userWords: [
      {
        id: 'abc',
        word: 'fake',
        addedOn: 1530518207007,
        userDefinitionAttempts: [],
        definition: 'test definition',
        partOfSpeech: 'noun',
        difficulty: 10,
      },
    ],
  });

  expect(getByText('Woords')).toBeInTheDocument();
  expect(getByText('fake')).toBeInTheDocument();
  expect(getByText('Difficulty')).toBeInTheDocument();
  expect(getByText('10')).toBeInTheDocument();
});
