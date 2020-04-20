import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render } from '@testing-library/react';
import theme from '../../styles/theme';
import '@testing-library/jest-dom/extend-expect';
import DifficultyRatingCircle from './DifficultyRatingCircle';

function renderDifficultyRatingCircle(props) {
  const utils = render(
    <ThemeProvider theme={theme}>
      <DifficultyRatingCircle {...props} />
    </ThemeProvider>
  );

  return { ...utils };
}

test('it renders the correct content based on difficulty', () => {
  const { container, getByText, getByTitle } = renderDifficultyRatingCircle({
    difficulty: 10,
  });

  expect(getByTitle('Difficulty')).toBeInTheDocument();
  expect(getByText('10')).toBeInTheDocument();
  expect(
    container.querySelector('.circle').getAttribute('stroke-dasharray')
  ).toEqual('100, 100');
  expect(container.querySelector('text').getAttribute('x')).toEqual('10');
});

test('it renders content differently based upon difficulty', () => {
  const { container, getByText, getByTitle } = renderDifficultyRatingCircle({
    difficulty: 7,
  });

  expect(getByTitle('Difficulty')).toBeInTheDocument();
  expect(getByText('7')).toBeInTheDocument();
  expect(
    container.querySelector('.circle').getAttribute('stroke-dasharray')
  ).toEqual('70, 100');
  expect(container.querySelector('text').getAttribute('x')).toEqual('14');
});
