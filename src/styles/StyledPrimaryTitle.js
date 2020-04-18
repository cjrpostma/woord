import styled from 'styled-components';

const StyledPrimaryTitle = styled.h1`
  color: ${({ theme }) => theme.colors.magenta};
  font-family: ${({ theme }) => theme.fontFamily.primary};
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  font-weight: 700;
  margin-top: 2rem;

  @media ${({ theme }) => theme.mediaQueries.below960} {
    font-size: 7rem;
  }

  @media ${({ theme }) => theme.mediaQueries.below720} {
    font-size: 6rem;
  }
`;

export default StyledPrimaryTitle;
