import React from 'react';

// components ------------------------------
import Header from '../../components/Header/Header';
import StyledHeaderTitle from '../../styles/StyledHeaderTitle';
import StyledHeaderSubtitle from '../../styles/StyledHeaderSubtitle';

const DailyWord = () => (
  <section>
    <Header>
      <StyledHeaderTitle>The Daily Word</StyledHeaderTitle>
      <StyledHeaderSubtitle>Today is </StyledHeaderSubtitle>
    </Header>
  </section>
);

export default DailyWord;
