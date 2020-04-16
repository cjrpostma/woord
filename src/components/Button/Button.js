import React from 'react';
import styled, { css } from 'styled-components';

const StyledButton = styled.button.attrs(props => ({
  type: 'button',
}))`
  background: ${props => props.theme.colors.magenta};
  border: 4px solid transparent;
  border-radius: ${props => props.theme.styles.borderRadius};
  color: #ffffff;
  font-family: 'Montserrat', sans-serif;
  font-size: ${props => props.theme.fontSizes.md};
  font-weight: 700;
  max-width: fit-content;
  text-transform: uppercase;
  padding: 0.6rem 1rem;
  transition: ease-in-out 100ms;
  transition-delay: 0ms, 0ms;

  ${({ secondary }) =>
    secondary &&
    css`
      background: #ffffff;
      border: 4px solid ${props => props.theme.colors.magenta};
      color: ${props => props.theme.colors.magenta};

      &:hover {
        background: ${props => props.theme.colors.magenta};
        border: 4px solid transparent;
        cursor: pointer;
        color: #ffffff;
      }
    `};

  &:hover {
    background: #ffffff;
    border: 4px solid ${props => props.theme.colors.magenta};
    cursor: pointer;
    color: ${props => props.theme.colors.magenta};
  }
`;

const Button = ({ children, secondary }) => (
  <StyledButton secondary={secondary}>{children}</StyledButton>
);

export default Button;
