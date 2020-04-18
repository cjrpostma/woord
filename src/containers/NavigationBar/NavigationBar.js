import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const StyledNav = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  & {
    visibility: hidden;
  }

  & > * {
    visibility: visible;
    transition: color 150ms linear 100ms, transform 150ms ease-in-out 100ms;
  }

  &:hover > * {
    color: ${({ theme }) => theme.colors.grayLight};
  }

  & > *:hover {
    color: #ffffff;
    transition-delay: 0ms, 0ms;
  }
`;

const activeClassName = 'nav-item-active';

const StyledNavLink = styled(NavLink).attrs({ activeClassName })`
  color: #ffffff;
  font-family: ${({ theme }) => theme.fontFamily.secondary};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: 700;
  margin: ${({ theme }) => theme.spacers.sm};
  padding: 0.6rem 1rem;
  text-decoration: none;
  text-transform: uppercase;

  &.${activeClassName} {
    text-decoration: underline;
  }

  &:active {
    outline: 2px solid white;
  }

  @media ${({ theme }) => theme.mediaQueries.below960} {
    font-size: ${({ theme }) => theme.fontSizes.sm};
    margin: 1rem 0.8rem;
  }

  @media ${({ theme }) => theme.mediaQueries.below720} {
    font-size: ${({ theme }) => theme.fontSizes.xs};
    margin: 1rem 0.1rem;
  }
`;

const NavigationBar = ({ userWords }) => (
  <StyledNav>
    <StyledNavLink exact to="/">
      Home
    </StyledNavLink>
    <StyledNavLink to="/about">About</StyledNavLink>
    <StyledNavLink to="/add">Add</StyledNavLink>
    <StyledNavLink to="/woords">
      Woords({userWords && userWords.length})
    </StyledNavLink>
  </StyledNav>
);

NavigationBar.propTypes = {
  userWords: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  userWords: state.userWords,
});

export default connect(mapStateToProps)(NavigationBar);
