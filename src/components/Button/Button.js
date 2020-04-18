import React from 'react';
import PropTypes from 'prop-types';

// components ------------------------------
import StyledButton from '../../styles/StyledButton';

const Button = ({ children, disabled, onClick, secondary }) => (
  <StyledButton disabled={disabled} secondary={secondary} onClick={onClick}>
    {children}
  </StyledButton>
);

Button.propTypes = {
  children: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  secondary: PropTypes.bool,
};

export default Button;
