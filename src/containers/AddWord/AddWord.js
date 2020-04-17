import React, { Component } from 'react';
import { connect } from 'react-redux';

// icons ------------------------------
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

// utils ------------------------------
import { wait } from '../../utils';
import { addUserWord } from '../../actions';
import { requestCurrentWord } from '../../thunks/requestCurrentWord';
import { requestRandomWord } from '../../thunks/requestRandomWord';

// components ------------------------------
import Button from '../../components/Button/Button';
import ContentWrapper from '../../styles/ContentWrapper';
import Header from '../../components/Header/Header';
import StyledActionText from '../../styles/StyledActionText';
import StyledDefinition from '../../styles/StyledDefinition';
import StyledErrorMessage from '../../styles/StyledErrorMessage';
import StyledHeaderTitle from '../../styles/StyledHeaderTitle';
import StyledLoaderIcon from '../../styles/StyledLoaderIcon';
import StyledTextInput from '../../styles/StyledTextInput';
import StyledWord from '../../styles/StyledWord';

class AddWord extends Component {
  state = {
    open: false,
    query: '',
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSubmit = async e => {
    e.preventDefault();
    await this.props.requestCurrentWord(this.state.query);
    this.setState({ query: '' });
  };

  addWord = () => {
    this.props.addUserWord(this.props.currentWord);
    this.setState({ open: true });
  };

  // TODO add clearword text link
  // TODO need an action creator to remove the current word
  // TODO remove currentWord after adding to word
  // TODO

  render() {
    return (
      <section>
        <Header>
          <StyledHeaderTitle>Add Woord</StyledHeaderTitle>
        </Header>
        <ContentWrapper>
          <form onSubmit={this.handleSubmit}>
            <StyledTextInput
              aria-label="Search for a word"
              id="query"
              onChange={e => this.setState({ query: e.target.value })}
              name="query"
              placeholder="Search for word..."
              type="text"
              value={this.state.query}
            />
          </form>
        </ContentWrapper>
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
          disabled={
            !this.props.currentWord || this.props.isLoading || this.props.error
          }
          onClick={this.addWord}
        >
          Add to Woords
        </Button>
        <StyledActionText
          disabled={
            !this.props.currentWord || this.props.isLoading || this.props.error
          }
        >
          Clear
        </StyledActionText>
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
const mapStateToProps = state => ({
  currentWord: state.currentWord,
  error: state.error,
  isLoading: state.isLoading,
});

const mapDispatchToProps = dispatch => ({
  addUserWord: word => dispatch(addUserWord(word)),
  requestCurrentWord: query => dispatch(requestCurrentWord(query)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddWord);
