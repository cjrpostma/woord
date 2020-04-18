import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// components ------------------------------
import DifficultyRatingCircle from '../DifficultyRatingCircle/DifficultyRatingCircle';

const StyledLink = styled(Link)`
  align-items: center;
  background: ${({ theme }) => theme.colors.magenta};
  border-radius: ${({ theme }) => theme.styles.borderRadius};
  color: #ffffff;
  display: flex;
  flex: auto;
  flex-wrap: nowrap;
  font-family: ${({ theme }) => theme.fontFamily.secondary};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: 400;
  justify-content: space-evenly;
  margin: ${({ theme }) => theme.spacers.sm};
  max-width: 24rem;
  padding: 1rem;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  transition: opacity 150ms linear 100ms, transform 150ms ease-in-out 100ms;
  visibility: visible;
`;

const WordCard = ({ difficulty, id, word }) => (
  <StyledLink to={`woords/${word}/${id}`}>
    <p>{word}</p>
    <DifficultyRatingCircle difficulty={difficulty} />
  </StyledLink>
);

WordCard.propTypes = {
  difficulty: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  word: PropTypes.string.isRequired,
};

export default WordCard;
