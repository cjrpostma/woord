import styled, { css } from 'styled-components';

const StyledButton = styled.button.attrs(props => ({
  type: 'button',
}))`
  background: ${({ theme }) => theme.colors.magenta};
  border: 4px solid transparent;
  border-radius: ${({ theme }) => theme.styles.borderRadius};
  color: #ffffff;
  display: block;
  font-family: 'Montserrat', sans-serif;
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: 700;
  margin: 0 auto;
  text-transform: uppercase;
  padding: 0.6rem 1rem;
  transition: ease-in-out 100ms;
  transition-delay: 0ms, 0ms;
  width: fit-content;

  ${({ secondary }) =>
    secondary &&
    css`
      background: #ffffff;
      border: 4px solid ${({ theme }) => theme.colors.magenta};
      color: ${({ theme }) => theme.colors.magenta};
    `};

  &:hover {
    background: #ffffff;
    border: 4px solid ${({ theme }) => theme.colors.magenta};
    cursor: pointer;
    color: ${({ theme }) => theme.colors.magenta};

    ${({ secondary }) =>
      secondary &&
      css`
        background: ${({ theme }) => theme.colors.magenta};
        border: 4px solid transparent;
        cursor: pointer;
        color: #ffffff;
      `};
  }

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.6;

      &:hover {
        cursor: auto;
        background: ${({ theme }) => theme.colors.magenta};
        border: 4px solid transparent;
        color: #ffffff;
      }
    `};
`;

export default StyledButton;
