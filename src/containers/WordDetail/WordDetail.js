import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';

// mui ------------------------------
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Slider from '@material-ui/core/Slider';
import Snackbar from '@material-ui/core/Snackbar';

// utils ------------------------------
import { capitalize } from '../../utils';
import { deleteUserWord } from '../../actions';

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
import StyledTextArea from '../../styles/StyledTextArea';
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
    open: false,
    showDefinition: false,
    userDefinitionAttempt: '',
  };

  handleBackClick = () => {
    this.props.history.goBack();
  };

  handleDeleteUserWord = () => {
    this.props.history.replace('/woords');
    this.props.deleteUserWord(this.props.id);
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
          and recite it from memory. Then record your definition attempt below.
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
              <CenteredBodyTypography>
                How difficult was it to recall the definition?
              </CenteredBodyTypography>
            </ContentWrapper>
            <StyledSlider
              defaultValue={5}
              marks
              max={10}
              min={1}
              step={1}
              valueLabelDisplay="auto"
            />
          </form>
        </ContentWrapper>
        <ContentWrapper>
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
        <StyledActionText onClick={this.handleDeleteUserWord}>
          Delete Woord
        </StyledActionText>
      </PositionedSection>
    );
  }
}

WordDetail.propTypes = {
  addedOn: PropTypes.number.isRequired,
  definition: PropTypes.string.isRequired,
  deleteUserWord: PropTypes.func.isRequired,
  difficulty: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  partOfSpeech: PropTypes.string.isRequired,
  userDefinitionAttempts: PropTypes.arrayOf(
    PropTypes.shape({
      attemptedOn: PropTypes.number,
      attemptedDefinition: PropTypes.string,
    })
  ),
  word: PropTypes.string.isRequired,
};

const mapDispatchToProps = dispatch => ({
  deleteUserWord: id => dispatch(deleteUserWord(id)),
});

export default withRouter(connect(null, mapDispatchToProps)(WordDetail));
