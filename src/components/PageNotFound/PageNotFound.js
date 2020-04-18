import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// components ------------------------------
import Button from '../Button/Button';
import ContentWrapper from '../../styles/ContentWrapper';
import Header from '../Header/Header';
import StyledBodyTypography from '../../styles/StyledBodyTypography';
import StyledHeaderTitle from '../../styles/StyledHeaderTitle';

const CenteredBodyTypography = styled(StyledBodyTypography)`
  text-align: center;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const PageNotFound = () => (
  <section>
    <Header>
      <StyledHeaderTitle>Page not found</StyledHeaderTitle>
    </Header>
    <ContentWrapper>
      <CenteredBodyTypography>
        If you entered a web address, please check it was correct.
      </CenteredBodyTypography>
      <StyledLink to="/">
        <Button>Return home</Button>
      </StyledLink>
    </ContentWrapper>
  </section>
);

export default PageNotFound;
