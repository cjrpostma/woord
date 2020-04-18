import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

// icons ------------------------------
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
import StyledHeaderSubtitle from '../../styles/StyledHeaderSubtitle';
import StyledTextInput from '../../styles/StyledTextInput';
import StyledWord from '../../styles/StyledWord';

class WordDetail extends Component {
  state = {
    open: false,
    userDefinitionAttempt: '',
  };

  render() {
    return (
      <section>
        <Header>
          <StyledHeaderTitle>Add Woord</StyledHeaderTitle>
          <StyledHeaderSubtitle>Added on ...</StyledHeaderSubtitle>
          <StyledHeaderSubtitle>Reviewed on ...</StyledHeaderSubtitle>
        </Header>

        <Button
          disabled={
            !this.props.currentWord || this.props.isLoading || this.props.error
          }
          onClick={this.addWord}
        >
          View definition
        </Button>
        <StyledActionText
          disabled={!this.props.currentWord || this.props.isLoading}
          onClick={() => this.props.deleteCurrentWord()}
        >
          Delete woord
        </StyledActionText>
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
  requestCurrentWord: userDefinitionAttempt =>
    dispatch(requestCurrentWord(userDefinitionAttempt)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WordDetail);
