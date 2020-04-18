import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

// icons ------------------------------
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

// utils ------------------------------
import { capitalize } from '../../utils';

// components ------------------------------
import Button from '../../components/Button/Button';
import ContentWrapper from '../../styles/ContentWrapper';
import Header from '../../components/Header/Header';
import StyledActionText from '../../styles/StyledActionText';
import StyledBodyTypography from '../../styles/StyledBodyTypography';
import StyledDefinition from '../../styles/StyledDefinition';
import StyledHeaderTitle from '../../styles/StyledHeaderTitle';
import StyledLoaderIcon from '../../styles/StyledLoaderIcon';
import StyledHeaderSubtitle from '../../styles/StyledHeaderSubtitle';
import StyledWord from '../../styles/StyledWord';

const CenteredBodyTypography = styled(StyledBodyTypography)`
  text-align: center;
`;

const ItalicizedSpan = styled.span`
  font-style: italic;
`;

class WordDetail extends Component {
  state = {
    open: false,
    userDefinitionAttempt: '',
  };

  render() {
    const {
      addedOn,
      definition,
      difficulty,
      id,
      partOfSpeech,
      userDefinitionAttempts,
      word,
    } = this.props;

    const addedOnDate = new Date(addedOn).toLocaleDateString();

    const previousReview =
      userDefinitionAttempts[userDefinitionAttempts.length - 1];

    let reviewedOnDate;

    if (previousReview && previousReview.length) {
      reviewedOnDate = new Date(
        previousReview.attemptedOn
      ).toLocaleDateString();
    } else {
      reviewedOnDate = '';
    }

    return (
      <section>
        <Header>
          <StyledHeaderTitle>{capitalize(word)}</StyledHeaderTitle>
          <StyledHeaderSubtitle>Added on {addedOnDate}</StyledHeaderSubtitle>
          {reviewedOnDate && (
            <StyledHeaderSubtitle>
              Reviewed on {reviewedOnDate}
            </StyledHeaderSubtitle>
          )}
        </Header>
        <CenteredBodyTypography>
          Think about the definition of <ItalicizedSpan>{word}</ItalicizedSpan>{' '}
          and recite it from memory. Then record your attempt at the definition
          below.
        </CenteredBodyTypography>
        <Button
          disabled={
            !this.props.currentWord || this.props.isLoading || this.props.error
          }
          onClick={this.addWord}
        >
          View definition
        </Button>
        <StyledActionText
          disabled={this.props.isLoading}
          onClick={() => this.props.deleteCurrentWord()}
        >
          Delete woord
        </StyledActionText>
      </section>
    );
  }
}

const mapDispatchToProps = dispatch => ({});

export default connect(null, mapDispatchToProps)(WordDetail);
