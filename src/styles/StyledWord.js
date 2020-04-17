import styled from 'styled-components';

const StyledWord = styled.p`
  color: ${({ theme }) => theme.colors.grayLight};
  font-family: ${({ theme }) => theme.fontFamily.secondary};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 700;
  text-align: center;
  text-transform: capitalize;

  @media ${({ theme }) => theme.mediaQueries.below720} {
    font-size: ${({ theme }) => theme.fontSizes.md};
  }
`;

export default StyledWord;
