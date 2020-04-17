import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';

// utils ------------------------------
import { getTodayFormatted } from '../../utils';
import { requestCurrentWord } from '../../thunks/requestCurrentWord';
import { requestRandomWord } from '../../thunks/requestRandomWord';

// components ------------------------------
import Button from '../../components/Button/Button';
import Header from '../../components/Header/Header';
import StyledDefinition from '../../styles/StyledDefinition';
import StyledErrorMessage from '../../styles/StyledErrorMessage';
import StyledHeaderSubtitle from '../../styles/StyledHeaderSubtitle';
import StyledHeaderTitle from '../../styles/StyledHeaderTitle';
import StyledLoaderIcon from '../../styles/StyledLoaderIcon';
import StyledRefreshIcon from '../../styles/StyledRefreshIcon';
import StyledWord from '../../styles/StyledWord';

const ContentWrapper = styled.div`
  margin: 4rem 0;
`;

class DailyWord extends Component {
  async componentDidMount() {
    await this.props.requestRandomWord();
    this.props.requestCurrentWord(this.props.randomWord);
  }

  render() {
    return (
      <section>
        <Header>
          <StyledHeaderTitle>The Daily Word</StyledHeaderTitle>
          <StyledHeaderSubtitle>
            Today is {getTodayFormatted()}
          </StyledHeaderSubtitle>
        </Header>
        <ContentWrapper>
          {this.props.error && (
            <StyledErrorMessage>{this.props.error.message}</StyledErrorMessage>
          )}
          {this.props.isLoading && <StyledLoaderIcon />}
          {this.props.currentWord && (
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
        <Button disabled={this.props.isLoading || this.props.error}>
          Add to words
        </Button>
        <StyledRefreshIcon
          disabled={this.props.isLoading || this.props.error}
          aria-label="refresh daily word"
        />
      </section>
    );
  }
}

const mapStateToProps = state => ({
  currentWord: state.currentWord,
  error: state.error,
  isLoading: state.isLoading,
  randomWord: state.randomWord,
});

const mapDispatchToProps = dispatch => ({
  requestCurrentWord: query => dispatch(requestCurrentWord(query)),
  requestRandomWord: () => dispatch(requestRandomWord()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DailyWord);
