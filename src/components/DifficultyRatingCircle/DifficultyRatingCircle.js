import React from 'react';
import PropTypes from 'prop-types';

const DifficultyRatingCircle = ({ difficulty }) => <p>{difficulty}</p>;

DifficultyRatingCircle.propTypes = {
  difficulty: PropTypes.number.isRequired,
};

export default DifficultyRatingCircle;
