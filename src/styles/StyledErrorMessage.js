import styled from 'styled-components';

const StyledErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.magenta};
  font-family: ${({ theme }) => theme.fontFamily.secondary};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 400;
  text-align: center;
`;

export default StyledErrorMessage;
