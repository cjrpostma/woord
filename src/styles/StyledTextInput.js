import styled from 'styled-components';

const StyledTextInput = styled.input`
  background: #ffffff;
  border: 0;
  display: block;
  color: ${({ theme }) => theme.colors.grayLight};
  font-family: ${({ theme }) => theme.fontFamily.primary};
  font-size: ${({ theme }) => theme.fontSizes.md};
  height: 4rem;
  margin: 0 auto;
  max-width: 26rem;
  padding: 0 1rem;
  width: 100%;

  &::placeholder {
    color: ${({ theme }) => theme.colors.grayLighter};
    font-family: ${({ theme }) => theme.fontFamily.primary};
    font-size: ${({ theme }) => theme.fontSizes.md};
    transform: translateY(4px);
  }
`;

export default StyledTextInput;
