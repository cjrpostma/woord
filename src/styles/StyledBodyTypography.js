import styled from 'styled-components';

const StyledBodyTypography = styled.p`
  color: ${({ theme }) => theme.colors.grayLight};
  display: block;
  font-family: ${({ theme }) => theme.fontFamily.secondary};
  font-size: ${({ theme }) => theme.fontSizes.md};
  line-height: 1.4;
  margin-bottom: ${({ theme }) => theme.spacers.md};
  margin-left: auto;
  margin-right: auto;
  max-width: 48rem;

  @media ${({ theme }) => theme.mediaQueries.below720} {
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
`;

export default StyledBodyTypography;
