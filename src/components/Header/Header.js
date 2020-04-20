import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// components ------------------------------
import StyledHorizontalRule from '../../styles/StyledHorizontalRule';

const StyledHeader = styled.header`
  margin: 0 auto;
  max-width: 48rem;
  text-align: center;
  width: 100%;
`;

const Header = ({ children }) => (
  <StyledHeader>
    {children}
    <StyledHorizontalRule />
  </StyledHeader>
);

Header.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.string,
  ]),
};

export default Header;
