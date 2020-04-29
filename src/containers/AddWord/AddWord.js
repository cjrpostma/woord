import React, { useState } from 'react';
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

const AddWord = (props) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!query) return;
    await props.requestCurrentWord(query);
    setQuery('');
  };

  const addWord = () => {
    props.addUserWord(props.currentWord);
    props.deleteCurrentWord();
    setOpen(true);
  };

  return (
    <section>
      <Header>
        <StyledHeaderTitle>Add Woord</StyledHeaderTitle>
      </Header>
      <ContentWrapper>
        {props.error && (
          <StyledErrorMessage>{props.error.message}</StyledErrorMessage>
        )}
        {props.isLoading && <StyledLoaderIcon />}
        {props.currentWord && !props.error && (
          <>
            <StyledWord>{props.currentWord.word}</StyledWord>
            <StyledDefinition
              dangerouslySetInnerHTML={{
                __html: `"${props.currentWord.text}"`,
              }}
            />
          </>
        )}
      </ContentWrapper>
      <ContentWrapper>
        <form onSubmit={handleSubmit}>
          <FormControl>
            <ScreenReaderText htmlFor="query">
              Search for a word
            </ScreenReaderText>
            <StyledTextInput
              aria-label="Search for a word"
              id="query"
              onChange={e => setQuery(e.target.value)}
              name="query"
              placeholder="Search for word..."
              type="text"
              value={query}
            />
            <ScreenReaderText htmlFor="search-submit">
              Submit search
            </ScreenReaderText>
            <SearchIcon
              aria-label="Submit word search"
              disabled={!query}
              id="search-submit"
              onClick={handleSubmit}
            />
          </FormControl>
        </form>
      </ContentWrapper>
      <Button
        disabled={
          !props.currentWord ||
          props.isLoading ||
          !!props.error
        }
        onClick={addWord}
      >
        Add to Woords
      </Button>
      <StyledActionText
        disabled={!props.currentWord || props.isLoading}
        onClick={() => props.deleteCurrentWord()}
      >
        Clear
      </StyledActionText>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message="Word added to collection."
        action={
          <>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </>
        }
      />
    </section>
  );
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
