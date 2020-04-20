import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

// selectors ------------------------------
import { findWord } from '../../selectors';

// components ------------------------------
import About from '../../components/About/About';
import AddWord from '../AddWord/AddWord';
import DailyWord from '../DailyWord/DailyWord';
import NavigationBar from '../NavigationBar/NavigationBar';
import PageNotFound from '../../components/PageNotFound/PageNotFound';
import StyledPrimaryTitle from '../../styles/StyledPrimaryTitle';
import StyledSecondaryTitle from '../../styles/StyledSecondaryTItle';
import WordContainer from '../WordContainer/WordContainer';
import WordDetail from '../WordDetail/WordDetail';

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

const AppWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(5, min-content);
  height: 100vh;
  justify-items: center;
  padding: 2rem 0;
  width: 100%;
`;

const App = props => (
  <AppWrapper>
    <NavigationBar />
    <StyledPrimaryTitle>Woord</StyledPrimaryTitle>
    <StyledSecondaryTitle>
      Encounter a word you don't know?
    </StyledSecondaryTitle>
    <StyledSecondaryTitle shouldFadeIn>Let's change that.</StyledSecondaryTitle>
    <StyledMain>
      <Switch>
        <Route
          path="/woords/:word/:id"
          render={({ match }) => {
            const { id } = match.params;
            const selectedWord = props.findWord(id);
            return (
              <WordDetail
                addedOn={selectedWord.addedOn}
                id={selectedWord.id}
                definition={selectedWord.definition}
                difficulty={selectedWord.difficulty}
                partOfSpeech={selectedWord.partOfSpeech}
                userDefinitionAttempts={selectedWord.userDefinitionAttempts}
                word={selectedWord.word}
              />
            );
          }}
        />
        <Route path="/woords" component={WordContainer} />
        <Route path="/add" component={AddWord} />
        <Route path="/about" component={About} />
        <Route exact path="/" component={DailyWord} />
        <Route component={PageNotFound} />
      </Switch>
    </StyledMain>
    <NavigationBar />
  </AppWrapper>
);

App.propTypes = {
  findWord: PropTypes.func,
};

const mapStateToProps = state => ({
  findWord: id => findWord(id, state.userWords),
  userWords: state.userWords,
});

export default connect(mapStateToProps)(App);
