import styled from 'styled-components';

const StyledHorizontalRule = styled.hr`
  border: 2px solid ${({ theme }) => theme.colors.magenta};
  margin-bottom: ${({ mb }) => mb || '6rem'};
  margin-left: auto;
  margin-right: auto;
  margin-top: ${({ mt }) => mt || '2rem'};
  width: 8rem;
`;

export default StyledHorizontalRule;
