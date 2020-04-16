import React from 'react';
import { getTodayFormatted } from '../../utils';

// components ------------------------------
import Button from '../../components/Button/Button';
import Header from '../../components/Header/Header';
import StyledHeaderTitle from '../../styles/StyledHeaderTitle';
import StyledHeaderSubtitle from '../../styles/StyledHeaderSubtitle';

const DailyWord = () => (
  <section>
    <Header>
      <StyledHeaderTitle>The Daily Word</StyledHeaderTitle>
      <StyledHeaderSubtitle>
        Today is {getTodayFormatted()}
      </StyledHeaderSubtitle>
    </Header>
    <Button>Add to words</Button>
  </section>
);

// will need to connect the component
// make an api call on load
// display the result
// add ADD TO WORDS button
// add refresh button
// will need to conditionally render loading, error

export default DailyWord;
