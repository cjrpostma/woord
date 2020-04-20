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

  const { getByLabelText, getByRole, getByText, queryByText } = render(
    <AddWord />
  );

  // cannot add a word to collection or clear it until a query has been submitted and api responds
  expect(getByText('Add to Woords')).toBeDisabled();
  expect(getByText('Clear')).toHaveAttribute('disabled');

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

  // expect 'Add to Woords' button and clear text to no longer be disabled
  expect(getByText('Add to Woords')).not.toBeDisabled();
  expect(getByText('Clear')).not.toHaveAttribute('disabled');

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

test('it renders an error when the api call rejects', async () => {
  const fakeQuery = 'chucknorris';
  window.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
      ok: false,
    })
  );

  const { getByLabelText, getByRole, getByText } = render(<AddWord />);

  // enter a search query and expect the input value to change
  fireEvent.change(getByLabelText('Search for a word'), {
    target: { value: fakeQuery },
  });

  // submit the query
  fireEvent.click(getByLabelText('Submit word search'));

  // expect loading spinner to be present
  expect(getByRole('progressbar')).toBeInTheDocument();

  // expect the api to be called via a thunk
  expect(window.fetch).toHaveBeenCalledTimes(1);

  await wait(() => {
    // expect an error message to be rendered
    expect(
      getByText(`Failed to fetch definition for ${fakeQuery}.`)
    ).toBeInTheDocument();
  });

  // expect 'Add to Woords' button to be disabled
  expect(getByText('Add to Woords')).toBeDisabled();
  expect(getByText('Clear')).toHaveAttribute('disabled');
});

test('it can clear a search result', async () => {
  window.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve([
          {
            partOfSpeech: 'noun',
            text: 'fake definition',
            word: 'fake',
          },
        ]),
    })
  );

  const { getByLabelText, getByText, queryByText } = render(<AddWord />);

  // enter a search query and expect the input value to change
  fireEvent.change(getByLabelText('Search for a word'), {
    target: { value: 'fake' },
  });

  // submit the query
  fireEvent.click(getByLabelText('Submit word search'));

  await wait(() => {
    // expect the queried word and its definition to be present
    expect(getByText('fake')).toBeInTheDocument();
    expect(getByText('"fake definition"')).toBeInTheDocument();
  });

  fireEvent.click(getByText('Clear'));

  await wait(() => {
    // expect the queried word and its definition to be removed
    expect(queryByText('fake')).not.toBeInTheDocument();
    expect(queryByText('"fake definition"')).not.toBeInTheDocument();
  });
});
