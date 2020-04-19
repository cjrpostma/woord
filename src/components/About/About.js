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
        Woord is an educational project developed in one week to practice React,
        Redux, Router, PropTypes, and Styled Components. Data is provided by the
        Wordnik API.
      </StyledBodyTypography>
      <StyledBodyTypography>
        Please note that this project uses a free but rate limited API key.
        Therefore, if receiving status 429 level errors, it is due to reaching
        the rate limit and will be lifted shortly.
      </StyledBodyTypography>
      <StyledHorizontalRule mb="4rem" mt="4rem" />
      <StyledBodyTypography>
        Woord is a site that can be used as a reading companion. The purpose is
        to log words one encounters while reading that are unknown or perhaps
        only vaguely understood.
      </StyledBodyTypography>
      <StyledBodyTypography>
        Once a word is logged, the user can view a formal definition and attempt
        to recite their own definition from memory. Unknown words begin with a
        difficulty level of 10 and the goal is, through consistent practice, to
        reduce the difficulty of recalling the definition and to increase
        understanding.
      </StyledBodyTypography>
      <StyledHorizontalRule mb="4rem" mt="4rem" />
      <StyledBodyTypography>
        There are many additional features I wish to implement, including a back
        end to authenticate users and allow them to persist their own data,
        filtering and sorting of words and definition attempts, allowing the API
        to display multiple definitions per word, and much more.
      </StyledBodyTypography>
    </ContentWrapper>
  </section>
);

export default About;
