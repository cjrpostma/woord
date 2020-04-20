import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import {
  cleanup,
  fireEvent,
  render as rtlRender,
  wait,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { ThemeProvider } from 'styled-components';
import rootReducer from '../../reducers';
import theme from '../../styles/theme';
import DailyWord from './DailyWord';

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
  const mockRandomWord = 'test';
  const mockCurrentWord = [
    {
      id: 'abc',
      word: 'test',
      text: 'test definition',
      partOfSpeech: 'noun',
    },
  ];

  window.fetch = jest
    .fn()
    .mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockRandomWord),
      })
    )
    .mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockCurrentWord),
      })
    );

  const { getByLabelText, getByRole, getByText } = render(<DailyWord />);

  // DailyWord
  expect(getByText('Daily Woord')).toBeInTheDocument();

  // 'Add to Woords' button
  expect(getByText('Add to Woords')).toBeInTheDocument();

  // Refresh icon
  expect(getByLabelText('Refresh word')).toBeInTheDocument();

  // Expect loading spinner to be present
  expect(getByRole('progressbar')).toBeInTheDocument();

  // expect randomWord to be fetched and passed to api call for currentWord
  expect(window.fetch).toHaveBeenCalledTimes(1);

  // expect randomWord to be in DOM
  await wait(() => {
    expect(getByText(mockRandomWord)).toBeInTheDocument();
    expect(window.fetch).toHaveBeenCalledTimes(2);
  });
});
