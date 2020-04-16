import React from 'react';
import { Route, Switch } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { fadeIn } from '../../styles';

// components ------------------------------
import About from '../../components/About/About';
import AddWord from '../AddWord/AddWord';
import DailyWord from '../DailyWord/DailyWord';
import NavigationBar from '../NavigationBar/NavigationBar';
import PageNotFound from '../../components/PageNotFound/PageNotFound';
import WordContainer from '../WordContainer/WordContainer';
import WordDetail from '../WordDetail/WordDetail';

const SecondaryTitle = styled.h3`
  color: ${({ theme }) => theme.colors.grayLightest};
  font-family: ${({ theme }) => theme.fontFamily.secondary};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 400;
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
  font-family: ${({ theme }) => theme.fontFamily.primary};
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  font-weight: 700;
  margin-top: 2rem;

  @media ${({ theme }) => theme.mediaQueries.below960} {
    font-size: 7rem;
  }

  @media ${({ theme }) => theme.mediaQueries.below720} {
    font-size: 6rem;
  }
`;

const StyledMain = styled.main`
  background: ${({ theme }) => theme.colors.grayLightest};
  border-radius: ${({ theme }) => theme.styles.borderRadius};
  box-shadow: ${({ theme }) => theme.styles.boxShadow};
  margin: 6rem 0;
  padding: 6rem 2rem;
  max-width: 60rem;
  width: 100%;

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
    <NavigationBar />
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
    </StyledMain>
    <NavigationBar />
  </Wrapper>
);

export default App;
