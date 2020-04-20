import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

// icons ------------------------------
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

// utils ------------------------------
import { getTodayFormatted, wait } from '../../utils';
import {
  addUserWord,
  deleteCurrentWord,
  setError,
  setIsLoading,
} from '../../actions';
import { requestCurrentWord } from '../../thunks/requestCurrentWord';
import { requestRandomWord } from '../../thunks/requestRandomWord';

// components ------------------------------
import Button from '../../components/Button/Button';
import ContentWrapper from '../../styles/ContentWrapper';
import Header from '../../components/Header/Header';
import StyledDefinition from '../../styles/StyledDefinition';
import StyledErrorMessage from '../../styles/StyledErrorMessage';
import StyledHeaderSubtitle from '../../styles/StyledHeaderSubtitle';
import StyledHeaderTitle from '../../styles/StyledHeaderTitle';
import StyledLoaderIcon from '../../styles/StyledLoaderIcon';
import StyledRefreshIcon from '../../styles/StyledRefreshIcon';
import StyledWord from '../../styles/StyledWord';

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
class DailyWord extends Component {
  state = {
    open: false,
  };

  async componentDidMount() {
    await this.props.requestRandomWord();
    this.props.requestCurrentWord(this.props.randomWord);
  }

  componentWillUnmount() {
    this.props.deleteCurrentWord();
    this.props.clearError();
    this.props.setIsLoadingFalse();
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  addWord = async () => {
    this.props.addUserWord(this.props.currentWord);
    this.setState({ open: true });
    await wait(1000);
    this.refreshWord();
  };

  refreshWord = async () => {
    await this.props.requestRandomWord();
    this.props.requestCurrentWord(this.props.randomWord);
  };

  render() {
    return (
      <section>
        <Header>
          <StyledHeaderTitle>Daily Woord</StyledHeaderTitle>
          <StyledHeaderSubtitle>{getTodayFormatted()}</StyledHeaderSubtitle>
        </Header>
        <ContentWrapper>
          {this.props.error && (
            <StyledErrorMessage>{this.props.error.message}</StyledErrorMessage>
          )}
          {this.props.isLoading && <StyledLoaderIcon />}
          {this.props.currentWord && !this.props.error && (
            <>
              <StyledWord>{this.props.currentWord.word}</StyledWord>
              <StyledDefinition
                dangerouslySetInnerHTML={{
                  __html: `"${this.props.currentWord.text}"`,
                }}
              />
            </>
          )}
        </ContentWrapper>
        <Button
          disabled={this.props.isLoading || !!this.props.error}
          onClick={this.addWord}
        >
          Add to Woords
        </Button>
        <ScreenReaderText htmlFor="refresh-button">
          Refresh word
        </ScreenReaderText>
        <StyledRefreshIcon
          aria-label="refresh daily word"
          disabled={this.props.isLoading}
          id="refresh-button"
          onClick={this.refreshWord}
        />

        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.open}
          autoHideDuration={3000}
          onClose={this.handleClose}
          message="Word added to collection."
          action={
            <>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={this.handleClose}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </>
          }
        />
      </section>
    );
  }
}

DailyWord.propTypes = {
  addUserWord: PropTypes.func.isRequired,
  currentWord: PropTypes.object,
  deleteCurrentWord: PropTypes.func.isRequired,
  error: PropTypes.object,
  isLoading: PropTypes.bool,
  randomWord: PropTypes.string,
  requestCurrentWord: PropTypes.func.isRequired,
  requestRandomWord: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  currentWord: state.currentWord,
  error: state.error,
  isLoading: state.isLoading,
  randomWord: state.randomWord,
});

const mapDispatchToProps = dispatch => ({
  addUserWord: word => dispatch(addUserWord(word)),
  clearError: () => dispatch(setError(null)),
  deleteCurrentWord: () => dispatch(deleteCurrentWord()),
  requestCurrentWord: query => dispatch(requestCurrentWord(query)),
  requestRandomWord: () => dispatch(requestRandomWord()),
  setIsLoadingFalse: () => dispatch(setIsLoading(false)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DailyWord);
