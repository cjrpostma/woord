import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import {
  cleanup,
  render as rtlRender,
  getByDisplayValue,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { ThemeProvider } from 'styled-components';
import rootReducer from '../../reducers';
import theme from '../../styles/theme';
import WordDetail from './WordDetail';

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

test('it renders the correct content', async () => {
  const fakeWord = 'fake';
  const fakeDifficulty = 10;

  const {
    debug,
    getByLabelText,
    getByPlaceholderText,
    getByTestId,
    getByText,
  } = render(
    <WordDetail
      id="abc"
      word={fakeWord}
      addedOn={1530518207007}
      userDefinitionAttempts={[]}
      definition="test definition"
      partOfSpeech="noun"
      difficulty={fakeDifficulty}
    />
  );

  // DifficultyCircle component
  expect(getByText('Difficulty')).toBeInTheDocument();
  expect(getByText(fakeDifficulty.toString())).toBeInTheDocument();

  // title of the word
  expect(getByText(fakeWord)).toBeInTheDocument();

  // added on date
  expect(getByText('Added on 7/2/2018')).toBeInTheDocument();

  // back button
  expect(getByLabelText('Click to navigate back')).toBeInTheDocument();

  // step 1 text
  expect(getByTestId('word-detail-step-1')).toBeInTheDocument();

  // textarea
  expect(
    getByPlaceholderText('Record definition attempt...')
  ).toBeInTheDocument();

  // step 2 text
  expect(getByTestId('word-detail-step-2')).toBeInTheDocument();

  // slider
  expect(
    getByLabelText('Select a difficulty level between 1 and 10')
  ).toBeInTheDocument();

  // submit button
  expect(getByText('Submit Attempt')).toBeInTheDocument();

  // delete button
  expect(getByText('Delete Woord')).toBeInTheDocument();
});

test('it renders the correct content', async () => {
  const fakeWord = 'fake';
  const fakeDifficulty = 10;

  const {
    debug,
    getByLabelText,
    getByPlaceholderText,
    getByTestId,
    getByText,
  } = render(
    <WordDetail
      id="abc"
      word={fakeWord}
      addedOn={1530518207007}
      userDefinitionAttempts={[]}
      definition="test definition"
      partOfSpeech="noun"
      difficulty={fakeDifficulty}
    />
  );

  // DifficultyCircle component
  expect(getByText('Difficulty')).toBeInTheDocument();
  expect(getByText(fakeDifficulty.toString())).toBeInTheDocument();

  // title of the word
  expect(getByText(fakeWord)).toBeInTheDocument();

  // added on date
  expect(getByText('Added on 7/2/2018')).toBeInTheDocument();

  // back button
  expect(getByLabelText('Click to navigate back')).toBeInTheDocument();

  // step 1 text
  expect(getByTestId('word-detail-step-1')).toBeInTheDocument();

  // textarea
  expect(
    getByPlaceholderText('Record definition attempt...')
  ).toBeInTheDocument();

  // step 2 text
  expect(getByTestId('word-detail-step-2')).toBeInTheDocument();

  // slider
  expect(
    getByLabelText('Select a difficulty level between 1 and 10')
  ).toBeInTheDocument();

  // submit button
  expect(getByText('Submit Attempt')).toBeInTheDocument();

  // delete button
  expect(getByText('Delete Woord')).toBeInTheDocument();
});
