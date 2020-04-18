import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// components ------------------------------
import DifficultyRatingCircle from '../DifficultyRatingCircle/DifficultyRatingCircle';

const StyledArticle = styled.article`
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
  justify-content: space-around;
  margin: ${({ theme }) => theme.spacers.sm};
  max-width: 24rem;
  padding: 1rem;
  text-align: center;
  text-transform: uppercase;
  transition: opacity 150ms linear 100ms, transform 150ms ease-in-out 100ms;
  visibility: visible;
`;

const WordCard = ({ difficulty, id, word }) => (
  <StyledArticle>
    <p>{word}</p>
    <DifficultyRatingCircle difficulty={difficulty} />
  </StyledArticle>
);

WordCard.propTypes = {
  word: PropTypes.string.isRequired,
  difficulty: PropTypes.number.isRequired,
};

export default WordCard;
