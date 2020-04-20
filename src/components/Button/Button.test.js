import React from 'react';
import { ThemeProvider } from 'styled-components';
import { fireEvent, render } from '@testing-library/react';
import theme from '../../styles/theme';
import '@testing-library/jest-dom/extend-expect';
import Button from './Button';

function renderButton(props) {
  const utils = render(
    <ThemeProvider theme={theme}>
      <Button {...props} />
    </ThemeProvider>
  );

  return { ...utils };
}

test('it renders the correct content based on child elements passed to its props', () => {
  const { getByText } = renderButton({ children: 'Test button' });

  expect(getByText('Test button')).toBeInTheDocument();
  expect(getByText('Test button')).not.toBeDisabled();
});

test('it is disabled when receiving disabled as a prop', () => {
  const { getByText } = renderButton({
    children: 'Test button',
    disabled: true,
  });

  expect(getByText('Test button')).toBeInTheDocument();
  expect(getByText('Test button')).toBeDisabled();
});

test('it invokes onClick handlers passed to it', () => {
  const mockOnClickHandler = jest.fn();
  const { getByText } = renderButton({
    children: 'Test button',
    disabled: false,
    onClick: mockOnClickHandler,
  });

  fireEvent.click(getByText('Test button'));
  expect(mockOnClickHandler).toHaveBeenCalledTimes(1);
});
