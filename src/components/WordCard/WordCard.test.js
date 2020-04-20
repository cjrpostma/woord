import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { render } from '@testing-library/react';
import theme from '../../styles/theme';
import '@testing-library/jest-dom/extend-expect';
import WordCard from './WordCard';

function renderWordCard(props) {
  const utils = render(
    <MemoryRouter>
      <ThemeProvider theme={theme}>
        <WordCard {...props} />
      </ThemeProvider>
    </MemoryRouter>
  );

  return { ...utils };
}

test('it renders the correct content', () => {
  const { getByText } = renderWordCard({
    difficulty: 10,
    id: 'abc',
    word: 'Fake word',
  });

  expect(getByText('Fake word')).toBeInTheDocument();
  expect(getByText('Difficulty')).toBeInTheDocument();
  expect(getByText('10')).toBeInTheDocument();
});
