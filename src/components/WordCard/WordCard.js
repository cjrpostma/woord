import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledArticle = styled.article`
  background: ${({ theme }) => theme.colors.magenta};
  border-radius: ${({ theme }) => theme.styles.borderRadius};
  color: #ffffff;
  display: flex;
  flex: auto;
  flex-wrap: nowrap;
  font-family: ${({ theme }) => theme.fontFamily.secondary};
  font-size: 1.5em;
  font-weight: 400;
  justify-content: space-around;
  margin: ${({ theme }) => theme.spacers.sm};
  max-width: 24rem;
  padding: 2rem;
  text-align: center;
  text-transform: uppercase;
  transition: opacity 150ms linear 100ms, transform 150ms ease-in-out 100ms;
  visibility: visible;
`;

const WordCard = ({ word, difficulty }) => (
  <StyledArticle>
    <p>{word}</p>
    <p>{difficulty}</p>
  </StyledArticle>
);

WordCard.propTypes = {
  word: PropTypes.string.isRequired,
  difficulty: PropTypes.number.isRequired,
};

export default WordCard;
