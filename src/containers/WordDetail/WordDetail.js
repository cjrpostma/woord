import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
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
import DifficultyRatingCircle from '../../components/DifficultyRatingCircle/DifficultyRatingCircle';
import Header from '../../components/Header/Header';
import StyledActionText from '../../styles/StyledActionText';
import StyledBackIcon from '../../styles/StyledBackIcon';
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

const PositionedLeft = styled.div`
  position: absolute;
`;

const PositionedRight = styled.div`
  position: absolute;
  right: 0;
`;

const PositionedSection = styled.section`
  position: relative;
`;

class WordDetail extends Component {
  state = {
    open: false,
    showDefinition: false,
    userDefinitionAttempt: '',
  };

  handleBackClick = () => {
    this.props.history.goBack();
  };

  toggleShowDefinition = () =>
    this.setState(prevState => ({ showDefinition: !prevState.showDefinition }));

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
      <PositionedSection>
        <PositionedLeft>
          <StyledBackIcon onClick={this.handleBackClick} />
        </PositionedLeft>
        <PositionedRight>
          <DifficultyRatingCircle difficulty={difficulty} secondary />
        </PositionedRight>
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
        <ContentWrapper>
          <p>The content goes in here</p>
          {this.state.showDefinition && (
            <>
              <StyledWord>{word}</StyledWord>
              <StyledDefinition
                dangerouslySetInnerHTML={{
                  __html: `"${definition}"`,
                }}
              />
            </>
          )}
        </ContentWrapper>
        <Button onClick={this.toggleShowDefinition}>
          {this.state.showDefinition ? 'Hide Definition' : 'Show Definition'}
        </Button>
        <StyledActionText
          disabled={this.props.isLoading}
          onClick={() => this.props.deleteCurrentWord()}
        >
          Delete woord
        </StyledActionText>
      </PositionedSection>
    );
  }
}

const mapDispatchToProps = dispatch => ({});

export default withRouter(connect(null, mapDispatchToProps)(WordDetail));
