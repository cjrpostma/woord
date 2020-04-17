import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

// icons ------------------------------
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

// utils ------------------------------
import { wait } from '../../utils';
import { addUserWord, deleteCurrentWord } from '../../actions';
import { requestCurrentWord } from '../../thunks/requestCurrentWord';

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
import StyledSearchIcon from '../../styles/StyledSearchIcon';
import StyledWord from '../../styles/StyledWord';

const FormControl = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: relative;
  max-width: fit-content;
  margin: 0 auto;
`;

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
    if (!this.state.query) return;
    await this.props.requestCurrentWord(this.state.query);
    this.setState({ query: '' });
  };

  addWord = () => {
    this.props.addUserWord(this.props.currentWord);
    this.props.deleteCurrentWord();
    this.setState({ open: true });
  };

  render() {
    return (
      <section>
        <Header>
          <StyledHeaderTitle>Add Woord</StyledHeaderTitle>
        </Header>
        <ContentWrapper>
          <form onSubmit={this.handleSubmit}>
            <FormControl>
              <StyledTextInput
                aria-label="Search for a word"
                id="query"
                onChange={e => this.setState({ query: e.target.value })}
                name="query"
                placeholder="Search for word..."
                type="text"
                value={this.state.query}
              />
              <StyledSearchIcon
                aria-label="Submit search for a word"
                disabled={!this.state.query}
                onClick={this.handleSubmit}
              />
            </FormControl>
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
          disabled={!this.props.currentWord || this.props.isLoading}
          onClick={() => this.props.deleteCurrentWord()}
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
  deleteCurrentWord: () => dispatch(deleteCurrentWord()),
  requestCurrentWord: query => dispatch(requestCurrentWord(query)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddWord);
