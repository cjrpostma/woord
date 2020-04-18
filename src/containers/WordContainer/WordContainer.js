import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// components ------------------------------
import ContentWrapper from '../../styles/ContentWrapper';
import Header from '../../components/Header/Header';
import StyledHeaderTitle from '../../styles/StyledHeaderTitle';

const WordContainer = ({ userWords }) => (
  <section>
    <Header>
      <StyledHeaderTitle>Woords</StyledHeaderTitle>
    </Header>
    <ContentWrapper>{userWords.map(word => word.word)}</ContentWrapper>
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
