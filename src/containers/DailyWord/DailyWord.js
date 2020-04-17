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
import StyledHeaderTitle from '../../styles/StyledHeaderTitle';
import StyledHeaderSubtitle from '../../styles/StyledHeaderSubtitle';
import StyledLoaderIcon from '../../styles/StyledLoaderIcon';
import StyledRefreshIcon from '../../styles/StyledRefreshIcon';
import StyledWord from '../../styles/StyledWord';

// TODO implement display of information on screen and formatting
// TODO implement loading animation
// TODO implement error handling

const ContentWrapper = styled.div`
  margin: 4rem 0;
`;

const StyledDefinition = styled.p`
  color: ${({ theme }) => theme.colors.grayLight};
  font-family: ${({ theme }) => theme.fontFamily.secondary};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 300;
  text-align: center;
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
          {this.props.isLoading && <StyledLoaderIcon />}

          {this.props.currentWord && (
            <StyledWord>{this.props.currentWord.word}</StyledWord>
          )}

          {this.props.currentWord && (
            <StyledDefinition
              dangerouslySetInnerHTML={{ __html: this.props.currentWord.text }}
            />
          )}
        </ContentWrapper>

        <Button disabled={false}>Add to words</Button>
        <StyledRefreshIcon disabled={false} aria-label="refresh daily word" />
      </section>
    );
  }
}

const mapStateToProps = state => ({
  currentWord: state.currentWord,
  isLoading: state.isLoading,
  randomWord: state.randomWord,
});

const mapDispatchToProps = dispatch => ({
  requestCurrentWord: query => dispatch(requestCurrentWord(query)),
  requestRandomWord: () => dispatch(requestRandomWord()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DailyWord);
