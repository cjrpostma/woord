import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body,
  html {
    background: #556271;
    height: 100%;
  }
`;

export default GlobalStyles;
