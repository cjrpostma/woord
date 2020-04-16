import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const activeClassName = 'nav-item-active';

const StyledNav = styled.nav`
  display: flex;
  flex-direction: row;

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
`;

const NavigationBar = () => (
  <StyledNav>
    <StyledNavLink exact to="/">
      Home
    </StyledNavLink>
    <StyledNavLink to="/about">About</StyledNavLink>
    <StyledNavLink to="/add">Add</StyledNavLink>
    <StyledNavLink to="/woords">Woords</StyledNavLink>
  </StyledNav>
);

export default NavigationBar;
