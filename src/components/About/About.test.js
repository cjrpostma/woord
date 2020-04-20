import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render } from '@testing-library/react';
import theme from '../../styles/theme';
import '@testing-library/jest-dom/extend-expect';
import About from './About';

function renderAbout() {
  const utils = render(
    <ThemeProvider theme={theme}>
      <About />
    </ThemeProvider>
  );

  return { ...utils };
}

test('it renders the correct content', () => {
  const { getByText } = renderAbout();

  expect(getByText('About')).toBeInTheDocument();
  expect(
    getByText(
      'Woord is an educational project developed in one week to practice React, Redux, Router, PropTypes, and Styled Components. Data is provided by the Wordnik API.'
    )
  ).toBeInTheDocument();
  expect(
    getByText(
      'Please note that this project uses a free but rate limited API key. Therefore, if receiving status 429 level errors, it is due to reaching the rate limit and will be lifted shortly.'
    )
  ).toBeInTheDocument();
  expect(
    getByText(
      'Woord is a site that can be used as a reading companion. The purpose is to log words one encounters while reading that are unknown or perhaps only vaguely understood.'
    )
  ).toBeInTheDocument();
  expect(
    getByText(
      'Once a word is logged, the user can view a formal definition and attempt to recite their own definition from memory. Unknown words begin with a difficulty level of 10 and the goal is, through consistent practice, to reduce the difficulty of recalling the definition and to increase understanding.'
    )
  ).toBeInTheDocument();
  expect(
    getByText(
      'There are many additional features I wish to implement, including a back end to authenticate users and allow them to persist their own data, filtering and sorting of words and definition attempts, allowing the API to display multiple definitions per word, and much more.'
    )
  ).toBeInTheDocument();
});
