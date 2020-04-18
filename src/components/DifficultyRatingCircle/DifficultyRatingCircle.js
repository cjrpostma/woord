import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { progress } from '../../styles';

const calculateX = difficulty => {
  switch (difficulty) {
    case 1:
      return '15';
    case 2 || 7:
      return '14';
    case 4:
      return '12';
    case 5 || 9:
      return '13.5';
    case 6 || 8:
      return '13';
    default:
      return '10';
  }
};

const StyledDifficultyRating = styled.svg`
  border-radius: 50%;
  width: 4rem;
  height: 4rem;

  & path.ring {
    fill: ${({ theme }) => theme.colors.magenta};
    stroke: ${({ theme }) => theme.colors.grayLighter};
    stroke-width: 0.125rem;
  }

  & text {
    fill: #ffffff;
    font-family: ${({ theme }) => theme.fontFamily.secondary};
    font-size: ${({ theme }) => theme.fontSizes.xs};
    font-weight: 400;
  }

  & path.circle {
    animation: ${progress} 1s ease-out forwards;
    fill: none;
    stroke: #ffffff;
    stroke-width: 0.125rem;
    stroke-linecap: square;
  }
`;

const DifficultyRatingCircle = ({ difficulty }) => (
  <StyledDifficultyRating viewBox="0 0 36 36">
    <path
      className="ring"
      d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
    />
    <path
      className="circle"
      strokeDasharray={`${difficulty * 10}, 100`}
      d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
    />
    <text x={calculateX(difficulty)} y="23.5">
      {difficulty}
    </text>
  </StyledDifficultyRating>
);

DifficultyRatingCircle.propTypes = {
  difficulty: PropTypes.number.isRequired,
};

export default DifficultyRatingCircle;
