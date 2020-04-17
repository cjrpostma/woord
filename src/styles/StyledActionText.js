import styled, { css } from 'styled-components';

const StyledActionText = styled.p`
  color: ${({ theme }) => theme.colors.magenta};
  display: block;
  font-family: ${({ theme }) => theme.fontFamily.secondary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin: 1rem auto;
  text-decoration: underline;
  text-align: center;
  transition: transform 150ms ease-in-out 100ms;

  &:hover {
    cursor: pointer;
  }

  &:active {
    opacity: 0.8;
  }

  ${({ disabled }) =>
    disabled &&
    css`
      color: ${({ theme }) => theme.colors.grayLighter};

      &:hover {
        cursor: auto;
      }
    `}
`;

export default StyledActionText;
