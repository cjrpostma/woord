import styled from 'styled-components';

const StyledTextInput = styled.textarea`
  background: #ffffff;
  border: 0;
  display: block;
  color: ${({ theme }) => theme.colors.grayLight};
  font-family: ${({ theme }) => theme.fontFamily.secondary};
  font-size: ${({ theme }) => theme.fontSizes.md};
  height: 8rem;
  margin: 0 auto;
  max-width: 26rem;
  min-width: 26rem;
  padding: 1rem;
  width: 100%;

  &::placeholder {
    color: ${({ theme }) => theme.colors.grayLighter};
    font-family: ${({ theme }) => theme.fontFamily.primary};
    font-size: ${({ theme }) => theme.fontSizes.md};
  }
`;

export default StyledTextInput;
