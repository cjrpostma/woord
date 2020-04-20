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
import NavigationBar from './NavigationBar';

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
  const { getByText } = render(<NavigationBar />);

  expect(getByText('Home')).toBeInTheDocument();
  expect(getByText('About')).toBeInTheDocument();
  expect(getByText('Add')).toBeInTheDocument();
  expect(getByText('Woords(0)')).toBeInTheDocument();
});

test('it renders length of userWords prop', async () => {
  const { getByText } = render(<NavigationBar />, {
    userWords: ['one', 'two'],
  });

  expect(getByText('Home')).toBeInTheDocument();
  expect(getByText('About')).toBeInTheDocument();
  expect(getByText('Add')).toBeInTheDocument();
  expect(getByText('Woords(2)')).toBeInTheDocument();
});
