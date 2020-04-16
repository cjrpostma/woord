import styled from 'styled-components';

const StyledHeaderSubtitle = styled.p`
  color: ${({ theme }) => theme.colors.grayLight};
  font-style: italic;
  font-family: ${({ theme }) => theme.fontFamily.secondary};
  font-size: ${({ theme }) => theme.fontSizes.md};
  text-align: center;
`;

export default StyledHeaderSubtitle;
