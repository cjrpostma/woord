import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

// mui ------------------------------
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

// utils ------------------------------
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
  margin: 0 auto;
  max-width: fit-content;
  position: relative;
`;

const SearchIcon = styled(StyledSearchIcon)`
  position: absolute;
  right: 1rem;
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
        <ContentWrapper>
          <form onSubmit={this.handleSubmit}>
            <FormControl>
              <ScreenReaderText htmlFor="query">
                Search for a word
              </ScreenReaderText>
              <StyledTextInput
                aria-label="Search for a word"
                id="query"
                onChange={e => this.setState({ query: e.target.value })}
                name="query"
                placeholder="Search for word..."
                type="text"
                value={this.state.query}
              />
              <ScreenReaderText htmlFor="search-submit">
                Submit search
              </ScreenReaderText>
              <SearchIcon
                aria-label="Submit word search"
                disabled={!this.state.query}
                id="search-submit"
                onClick={this.handleSubmit}
              />
            </FormControl>
          </form>
        </ContentWrapper>
        <Button
          disabled={
            !this.props.currentWord ||
            this.props.isLoading ||
            !!this.props.error
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

AddWord.propTypes = {
  currentWord: PropTypes.object,
  error: PropTypes.object,
  isLoading: PropTypes.bool,
};

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
