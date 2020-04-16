import styled from 'styled-components';

const StyledHeaderTitle = styled.h3`
  color: ${({ theme }) => theme.colors.gray};
  font-family: ${({ theme }) => theme.fontFamily.primary};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 400;
  margin-bottom: 1rem;
  text-align: center;
`;

export default StyledHeaderTitle;
