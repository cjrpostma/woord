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
import App from './App';

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

  const { getAllByText, getByRole, getByText } = render(<App />);

  // NavigationBar
  expect(getAllByText('Home')[0]).toBeInTheDocument();
  expect(getAllByText('About')[0]).toBeInTheDocument();
  expect(getAllByText('Add')[0]).toBeInTheDocument();
  expect(getAllByText('Woords(0)')[0]).toBeInTheDocument();

  // titles
  expect(getByText('Woord')).toBeInTheDocument();
  expect(getByText(`Encounter a word you don't know?`)).toBeInTheDocument();
  expect(getByText("Let's change that.")).toBeInTheDocument();

  // DailyWord
  expect(getByText('Daily Woord')).toBeInTheDocument();

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
