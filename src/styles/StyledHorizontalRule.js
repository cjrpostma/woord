import styled from 'styled-components';

const StyledHorizontalRule = styled.hr`
  border: 2px solid ${({ theme }) => theme.colors.magenta};
  margin: 2rem auto 4rem auto;
  width: 8rem;
`;

export default StyledHorizontalRule;
