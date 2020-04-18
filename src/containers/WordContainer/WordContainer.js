import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// components ------------------------------
import ContentWrapper from '../../styles/ContentWrapper';
import Header from '../../components/Header/Header';
import StyledHeaderTitle from '../../styles/StyledHeaderTitle';

// takes in words, displays cards
// the cards themselves are not connected, they just open links to worddetails

const WordContainer = ({ userWords }) => (
  <section>
    <Header>
      <StyledHeaderTitle>Woords</StyledHeaderTitle>
    </Header>
    <ContentWrapper>{userWords.map(word => 'hello')}</ContentWrapper>
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
