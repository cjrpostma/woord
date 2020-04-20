import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';

// mui ------------------------------
import Slider from '@material-ui/core/Slider';

// utils ------------------------------
import { capitalize } from '../../utils';
import {
  addUserWordAttempt,
  deleteUserWord,
  setUserWordDifficulty,
} from '../../actions';

// components ------------------------------
import Button from '../../components/Button/Button';
import ContentWrapper from '../../styles/ContentWrapper';
import DifficultyRatingCircle from '../../components/DifficultyRatingCircle/DifficultyRatingCircle';
import Header from '../../components/Header/Header';
import StyledActionText from '../../styles/StyledActionText';
import StyledBackIcon from '../../styles/StyledBackIcon';
import StyledBodyTypography from '../../styles/StyledBodyTypography';
import StyledHeaderTitle from '../../styles/StyledHeaderTitle';
import StyledHeaderSubtitle from '../../styles/StyledHeaderSubtitle';
import StyledTextArea from '../../styles/StyledTextArea';

const CenteredBodyTypography = styled(StyledBodyTypography)`
  text-align: center;
`;

const BoldSpan = styled.span`
  font-weight: 700;
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

const ScreenReaderText = styled.label`
  border: 0;
  clip: rect(1px, 1px, 1px, 1px);
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  position: absolute !important;
  word-wrap: normal !important;
  width: 1px;
`;

const StyledSlider = styled(Slider)`
  && {
    color: ${({ theme }) => theme.colors.magenta};
    display: block;
    margin: 0 auto;
    max-width: 26rem;
    min-width: 26rem;
  }
`;

class WordDetail extends Component {
  state = {
    showAttempt: false,
    sliderValue: 1,
    userDefinitionAttempt: '',
  };

  handleBackClick = () => {
    this.props.history.goBack();
  };

  handleDeleteUserWord = () => {
    this.props.history.replace('/woords');
    this.props.deleteUserWord(this.props.id);
  };

  handleSliderChange = (event, sliderValue) => this.setState({ sliderValue });

  toggleShowAttempt = async () => {
    const { showAttempt, sliderValue, userDefinitionAttempt } = this.state;
    const { addUserWordAttempt, id, setUserWordDifficulty } = this.props;

    if (!showAttempt) {
      await addUserWordAttempt(id, userDefinitionAttempt);
      await setUserWordDifficulty(id, sliderValue);
      this.setState({ sliderValue: 1, userDefinitionAttempt: '' });
    }

    this.setState(prevState => ({ showAttempt: !prevState.showAttempt }));
  };

  render() {
    const {
      addedOn,
      definition,
      difficulty,
      userDefinitionAttempts,
      word,
    } = this.props;

    const addedOnDate = new Date(addedOn).toLocaleDateString();

    const previousReview =
      userDefinitionAttempts[userDefinitionAttempts.length - 1];

    let reviewedOnDate;

    if (previousReview) {
      reviewedOnDate = new Date(
        previousReview.attemptedOn
      ).toLocaleDateString();
    } else {
      reviewedOnDate = '';
    }

    return (
      <PositionedSection>
        <PositionedLeft>
          <ScreenReaderText htmlFor="back-button">
            Click to navigate back
          </ScreenReaderText>
          <StyledBackIcon id="back-button" onClick={this.handleBackClick} />
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
        {!this.state.showAttempt && (
          <>
            <CenteredBodyTypography data-testid="word-detail-step-1">
              <BoldSpan>Step 1.</BoldSpan>
              <br />
              Recite the definition of <ItalicizedSpan>
                {word}
              </ItalicizedSpan>{' '}
              from memory.
            </CenteredBodyTypography>
            <ContentWrapper>
              <form onSubmit={this.handleSubmit}>
                <StyledTextArea
                  aria-label={`Enter your definition for the word ${word}`}
                  id="query"
                  onChange={e =>
                    this.setState({ userDefinitionAttempt: e.target.value })
                  }
                  name="query"
                  placeholder="Record definition attempt..."
                  type="textarea"
                  value={this.state.userDefinitionAttempt}
                />
                <ContentWrapper>
                  <CenteredBodyTypography data-testid="word-detail-step-2">
                    <BoldSpan>Step 2.</BoldSpan>
                    <br />
                    How difficult was it to recall the definition?
                  </CenteredBodyTypography>
                </ContentWrapper>
                <ScreenReaderText htmlFor="difficulty-slider">
                  Select a difficulty level between 1 and 10
                </ScreenReaderText>
                <StyledSlider
                  defaultValue={1}
                  id="difficulty-slider"
                  marks
                  max={10}
                  min={1}
                  onChange={this.handleSliderChange}
                  step={1}
                  value={this.state.sliderValue}
                  valueLabelDisplay="auto"
                />
              </form>
            </ContentWrapper>
          </>
        )}
        {this.state.showAttempt && (
          <ContentWrapper>
            <CenteredBodyTypography>
              <BoldSpan>Recorded entry</BoldSpan>
              <br />
              <ItalicizedSpan>
                "{previousReview.attemptedDefinition}"
              </ItalicizedSpan>
            </CenteredBodyTypography>
            <CenteredBodyTypography>
              <BoldSpan>Dictionary entry</BoldSpan>
              <br />
              <ItalicizedSpan
                dangerouslySetInnerHTML={{
                  __html: `"${definition}"`,
                }}
              />
            </CenteredBodyTypography>
          </ContentWrapper>
        )}
        <Button
          disabled={
            !this.state.userDefinitionAttempt && !this.state.showAttempt
          }
          onClick={this.toggleShowAttempt}
        >
          {this.state.showAttempt ? 'Return' : 'Submit Attempt'}
        </Button>
        <StyledActionText onClick={this.handleDeleteUserWord}>
          Delete Woord
        </StyledActionText>
      </PositionedSection>
    );
  }
}

WordDetail.propTypes = {
  addedOn: PropTypes.number.isRequired,
  addUserWordAttempt: PropTypes.func.isRequired,
  definition: PropTypes.string.isRequired,
  deleteUserWord: PropTypes.func.isRequired,
  difficulty: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  setUserWordDifficulty: PropTypes.func.isRequired,
  userDefinitionAttempts: PropTypes.arrayOf(
    PropTypes.shape({
      attemptedOn: PropTypes.number,
      attemptedDefinition: PropTypes.string,
    })
  ),
  word: PropTypes.string.isRequired,
};

const mapDispatchToProps = dispatch => ({
  addUserWordAttempt: (wordId, attemptedDefinition) =>
    dispatch(addUserWordAttempt(wordId, attemptedDefinition)),
  deleteUserWord: id => dispatch(deleteUserWord(id)),
  setUserWordDifficulty: (wordId, difficulty) =>
    dispatch(setUserWordDifficulty(wordId, difficulty)),
});

export default withRouter(connect(null, mapDispatchToProps)(WordDetail));
