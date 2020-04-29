import React, { useState } from 'react';
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

const WordDetail = (props) => {
  const [showAttempt, setShowAttempt] = useState(false);
  const [sliderValue, setSliderValue] = useState(1);
  const [userDefinitionAttempt, setUserDefinitionAttempt] = useState('');

  const handleBackClick = () => {
    props.history.goBack();
  };

  const handleDeleteUserWord = () => {
    props.history.replace('/woords');
    props.deleteUserWord(props.id);
  };

  const handleSliderChange = (event, sliderValue) => setSliderValue(sliderValue);

  const toggleShowAttempt = async () => {
    const { addUserWordAttempt, id, setUserWordDifficulty } = props;

    if (!showAttempt) {
      await addUserWordAttempt(id, userDefinitionAttempt);
      await setUserWordDifficulty(id, sliderValue);
      setSliderValue(1);
      setUserDefinitionAttempt('');
    }

    setShowAttempt(a => !a)
  };

  const {
    addedOn,
    definition,
    difficulty,
    userDefinitionAttempts,
    word,
  } = props;

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
        <StyledBackIcon id="back-button" onClick={handleBackClick} />
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
      {!showAttempt && (
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
            <form>
              <StyledTextArea
                aria-label={`Enter your definition for the word ${word}`}
                id="query"
                onChange={e => setUserDefinitionAttempt(e.target.value)}
                name="query"
                placeholder="Record definition attempt..."
                type="textarea"
                value={userDefinitionAttempt}
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
                onChange={handleSliderChange}
                step={1}
                value={sliderValue}
                valueLabelDisplay="auto"
              />
            </form>
          </ContentWrapper>
        </>
      )}
      {showAttempt && (
        <ContentWrapper>
          <CenteredBodyTypography data-testid="recorded-entry">
            <BoldSpan>Recorded entry</BoldSpan>
            <br />
            <ItalicizedSpan>
              "{previousReview.attemptedDefinition}"
            </ItalicizedSpan>
          </CenteredBodyTypography>
          <CenteredBodyTypography data-testid="dictionary-entry">
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
          !userDefinitionAttempt && !showAttempt
        }
        onClick={toggleShowAttempt}
      >
        {showAttempt ? 'Return' : 'Submit Attempt'}
      </Button>
      <StyledActionText onClick={handleDeleteUserWord}>
        Delete Woord
      </StyledActionText>
    </PositionedSection>
  );
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
