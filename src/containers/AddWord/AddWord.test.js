import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import {
  cleanup,
  fireEvent,
  render as rtlRender,
  wait,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { ThemeProvider } from 'styled-components';
import rootReducer from '../../reducers';
import theme from '../../styles/theme';
import AddWord from './AddWord';

const render = (ui, initialStore = {}, options = {}) => {
  const store = createStore(rootReducer, applyMiddleware(thunk));
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

test("it allows searching for a word and adding it to the user's collection of words", async () => {
  window.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve([
          {
            partOfSpeech: 'noun',
            text: 'fake definition',
            word: 'fake word',
          },
        ]),
    })
  );

  const { debug, getByLabelText, getByRole, getByText, queryByText } = render(
    <AddWord />
  );

  // cannot add a word to collection until a query has been submitted and api responds
  expect(getByText('Add to Woords')).toBeDisabled();

  // enter a search query and expect the input value to change
  fireEvent.change(getByLabelText('Search for a word'), {
    target: { value: 'mock' },
  });
  expect(getByLabelText('Search for a word').value).toEqual('mock');

  // submit the query
  fireEvent.click(getByLabelText('Submit word search'));

  // expect loading spinner to be present
  expect(getByRole('progressbar')).toBeInTheDocument();

  // expect the api to be called via a thunk
  expect(window.fetch).toHaveBeenCalledTimes(1);

  await wait(() => {
    // expect the queried word and its definition to be present
    expect(getByText('fake word')).toBeInTheDocument();
    expect(getByText('"fake definition"')).toBeInTheDocument();
  });

  // expect search query field to be reset after submitting query
  expect(getByLabelText('Search for a word').value).toEqual('');

  // expect 'Add to Woords' button to no longer be disabled
  expect(getByText('Add to Woords')).not.toBeDisabled();

  // click the 'Add to Woords' button to dispatch an action to add the word to the users collection
  fireEvent.click(getByText('Add to Woords'));

  // expect snackbar to display feedback that word was added
  expect(getByText('Word added to collection.')).toBeInTheDocument();

  // expect the word and definiton to no longer be present on the page after adding to user's collection
  await wait(() => {
    expect(queryByText('fake word')).not.toBeInTheDocument();
    expect(queryByText('"fake definition"')).not.toBeInTheDocument();
  });
});
