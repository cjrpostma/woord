import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';

// icons ------------------------------
import CachedIcon from '@material-ui/icons/Cached';

// utils ------------------------------
import { getTodayFormatted } from '../../utils';

// components ------------------------------
import Button from '../../components/Button/Button';
import Header from '../../components/Header/Header';
import StyledHeaderTitle from '../../styles/StyledHeaderTitle';
import StyledHeaderSubtitle from '../../styles/StyledHeaderSubtitle';

const StyledRefreshIcon = styled(CachedIcon)`
  color: ${({ theme }) => theme.colors.magenta};

  && {
    display: block;
    font-size: ${({ theme }) => theme.fontSizes.lg};
    margin: 2rem auto;
    transition: transform 150ms ease-in-out 100ms;
  }

  &:hover {
    cursor: pointer;
    transform: scale(0.9);
  }

  ${({ disabled }) =>
    disabled &&
    css`
      color: ${({ theme }) => theme.colors.grayLighter};

      &:hover {
        cursor: auto;
        transform: scale(1);
      }
    `}
`;

class DailyWord extends Component {
  componentDidMount() {
    // call dispathc method here
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
        <StyledRefreshIcon disabled={false} aria-label="refresh daily word" />
        <Button disabled={false}>Add to words</Button>
      </section>
    );
  }
}

// will need to connect the component
// make an api call on load
// display the result
// ! add ADD TO WORDS button
// ! add refresh button
// will need to conditionally render loading, error

export default DailyWord;
