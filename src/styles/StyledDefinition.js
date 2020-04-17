import styled from 'styled-components';

const StyledDefinition = styled.p`
  color: ${({ theme }) => theme.colors.grayLight};
  font-family: ${({ theme }) => theme.fontFamily.secondary};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 300;
  text-align: center;

  @media ${({ theme }) => theme.mediaQueries.below720} {
    font-size: ${({ theme }) => theme.fontSizes.md};
  }
`;

export default StyledDefinition;
