import React from 'react';

// components ------------------------------
import ContentWrapper from '../../styles/ContentWrapper';
import Header from '../Header/Header';
import StyledBodyTypography from '../../styles/StyledBodyTypography';
import StyledHeaderTitle from '../../styles/StyledHeaderTitle';
import StyledHorizontalRule from '../../styles/StyledHorizontalRule';

const About = () => (
  <section>
    <Header>
      <StyledHeaderTitle>About</StyledHeaderTitle>
    </Header>
    <ContentWrapper>
      <StyledBodyTypography>
        Woord is a site that can be used as a reading companion. The purpose is
        to log words one encounters while reading that are unknown or perhaps
        only vaguely understood.
      </StyledBodyTypography>

      <StyledBodyTypography>
        Once a word is logged, the user can view a formal definition and attempt
        to recite their own definition from memory. Unknown words begin with a
        difficulty level of 10 and the goal is, through consistent practice, to
        reduce the difficulty of recalling the definition and increase
        understanding.
      </StyledBodyTypography>
      <StyledHorizontalRule mb="4rem" mt="4rem" />
      <StyledBodyTypography>
        Woord is an educational project developed in one week to practice React,
        Redux, Router, and PropTypes. Styling is accomplished via Styled
        Components. Data is provided by the Wordnik API.
      </StyledBodyTypography>
    </ContentWrapper>
  </section>
);

export default About;
