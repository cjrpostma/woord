import styled, { css } from 'styled-components';
import { fadeIn } from '.';

const StyledSecondaryTitle = styled.h3`
  color: ${({ theme }) => theme.colors.grayLightest};
  font-family: ${({ theme }) => theme.fontFamily.secondary};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 400;
  text-align: center;

  ${({ shouldFadeIn }) =>
    shouldFadeIn &&
    css`
      animation: 2s ${fadeIn} ease-in;
    `}

  @media ${({ theme }) => theme.mediaQueries.below960} {
    font-size: 2.4rem;
  }

  @media ${({ theme }) => theme.mediaQueries.below720} {
    font-size: 1.6rem;
  }
`;
export default StyledSecondaryTitle;
