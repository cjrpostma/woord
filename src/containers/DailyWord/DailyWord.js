import React from 'react';

// components ------------------------------
import Header from '../../components/Header/Header';
import StyledHeaderTitle from '../../styles/StyledHeaderTitle';
import StyledHeaderSubtitle from '../../styles/StyledHeaderSubtitle';

const d = new Date();

const today = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
][d.getDay()];

const day = d.getDate();

const month = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
][d.getMonth()];

const year = d.getFullYear();

const DailyWord = () => (
  <section>
    <Header>
      <StyledHeaderTitle>The Daily Word</StyledHeaderTitle>
      <StyledHeaderSubtitle>
        Today is {`${today}, ${month} ${day}, ${year}`}
      </StyledHeaderSubtitle>
    </Header>
  </section>
);

export default DailyWord;
