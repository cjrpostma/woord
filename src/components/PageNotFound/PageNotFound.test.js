import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { fireEvent, render } from '@testing-library/react';
import theme from '../../styles/theme';
import '@testing-library/jest-dom/extend-expect';
import PageNotFound from './PageNotFound';

function renderPageNotFound(props) {
  const utils = render(
    <MemoryRouter>
      <ThemeProvider theme={theme}>
        <PageNotFound {...props} />
      </ThemeProvider>
    </MemoryRouter>
  );

  return { ...utils };
}

test('it renders the correct content', () => {
  const { getByText } = renderPageNotFound();

  expect(getByText('Page not found')).toBeInTheDocument();
  expect(
    getByText('If you entered a web address, please check it was correct.')
  ).toBeInTheDocument();
  expect(getByText('Return home')).toBeInTheDocument();
});
