import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// components ------------------------------
import ContentWrapper from '../../styles/ContentWrapper';
import Header from '../../components/Header/Header';
import StyledBodyTypography from '../../styles/StyledBodyTypography';
import StyledHeaderTitle from '../../styles/StyledHeaderTitle';
import WordCard from '../../components/WordCard/WordCard';

const CenteredBodyTypography = styled(StyledBodyTypography)`
  text-align: center;
`;

const WordCardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  visibility: hidden;

  &&:hover > * {
    opacity: 0.4;
    transform: scale(0.9);
  }

  && > *:hover {
    cursor: pointer;
    opacity: 1;
    transform: scale(1);
    transition-delay: 0ms, 0ms;
  }
`;

const WordContainer = ({ userWords }) => (
  <section>
    <Header>
      <StyledHeaderTitle>Woords</StyledHeaderTitle>
    </Header>
    <ContentWrapper>
      {!userWords.length && (
        <>
          <CenteredBodyTypography>
            You currently have no Woords. Add a few to get started!
          </CenteredBodyTypography>
        </>
      )}
      <WordCardWrapper>
        {userWords.map(word => (
          <WordCard
            difficulty={word.difficulty}
            id={word.id}
            key={word.id}
            word={word.word}
          />
        ))}
      </WordCardWrapper>
    </ContentWrapper>
  </section>
);

WordContainer.propTypes = {
  userWords: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      word: PropTypes.string,
      addedOn: PropTypes.number,
      userDefinitionAttempts: PropTypes.arrayOf(
        PropTypes.shape({
          attemptedOn: PropTypes.number,
          attemptedDefinition: PropTypes.string,
        })
      ),
      definition: PropTypes.string,
      difficulty: PropTypes.number,
    })
  ).isRequired,
};

const mapStateToProps = state => ({
  userWords: state.userWords,
});

export default connect(mapStateToProps)(WordContainer);
