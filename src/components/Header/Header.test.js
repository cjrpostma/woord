import React from 'react';
import { ThemeProvider } from 'styled-components';
import { fireEvent, render } from '@testing-library/react';
import theme from '../../styles/theme';
import '@testing-library/jest-dom/extend-expect';
import Header from './Header';

function renderHeader(props) {
  const utils = render(
    <ThemeProvider theme={theme}>
      <Header {...props} />
    </ThemeProvider>
  );

  return { ...utils };
}

test('it renders the correct content based on child elements passed to its props', () => {
  const { getByText } = renderHeader({ children: 'Fake content' });

  expect(getByText('Fake content')).toBeInTheDocument();
});
