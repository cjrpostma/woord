import React from 'react';
import { Route, Switch } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { fadeIn } from '../../styles';

// components ------------------------------
import WordDetail from '../WordDetail/WordDetail';
import WordContainer from '../WordContainer/WordContainer';
import AddWord from '../AddWord/AddWord';
import DailyWord from '../DailyWord/DailyWord';
import About from '../../components/About/About';
import PageNotFound from '../../components/PageNotFound/PageNotFound';

const SecondaryTitle = styled.h3`
  color: ${({ theme }) => theme.colors.grayLightest};
  font-family: 'Montserrat', sans-serif;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 300;
  text-align: center;

  ${({ shouldFadeIn }) =>
    shouldFadeIn &&
    css`
      animation: 2s ${fadeIn} ease-in;
    `}

  @media ${({ theme }) => theme.mediaQueries.below960} {
    font-size: 2.4rem;
  }
  @media ${({ theme }) => theme.mediaQueries.below720} {
    font-size: 1.6rem;
  }
`;

const PrimaryTitle = styled.h1`
  color: ${({ theme }) => theme.colors.magenta};
  font-family: 'Roboto', sans-serif;
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  margin-top: 2rem;

  @media ${({ theme }) => theme.mediaQueries.below720} {
    font-size: 6rem;
  }
  @media ${({ theme }) => theme.mediaQueries.below960} {
    font-size: 7rem;
  }
`;

const StyledMain = styled.main`
  background: ${({ theme }) => theme.colors.grayLightest};
  border-radius: ${({ theme }) => theme.styles.borderRadius};
  box-shadow: ${({ theme }) => theme.styles.boxShadow};
  margin: 4rem 0;
  padding: 2rem;
  max-width: 60rem;

  @media ${({ theme }) => theme.mediaQueries.below960} {
    border-radius: 0;
  }
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(5, min-content);
  height: 100vh;
  justify-items: center;
  padding: 2rem 0;
  width: 100%;
`;

const App = () => (
  <Wrapper>
    <p>Navigation - Top (Placeholder)</p>
    <PrimaryTitle>Woord</PrimaryTitle>
    <SecondaryTitle>Encounter a word you don’t know?</SecondaryTitle>
    <SecondaryTitle shouldFadeIn>Let’s change that.</SecondaryTitle>
    <StyledMain>
      <Switch>
        <Route path="/woords/:id" component={WordDetail} />
        <Route path="/woords" component={WordContainer} />
        <Route path="/add" component={AddWord} />
        <Route path="/about" component={About} />
        <Route exact path="/" component={DailyWord} />
        <Route component={PageNotFound} />
      </Switch>
      This is the main wrapper. Content inside here needs to take up at least
      48rem width or else it is very asdas dasdasdsd asdads ads as asd asd asd
      asd a dasdas asasd as dasda s
    </StyledMain>
    <p>Navigation - Bottom (Placeholder)</p>
  </Wrapper>
);

export default App;
