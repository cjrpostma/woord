import React from 'react';

// components ------------------------------
import StyledButton from '../../styles/StyledButton';

const Button = ({ children, disabled, onClick, secondary }) => (
  <StyledButton disabled={disabled} secondary={secondary} onClick={onClick}>
    {children}
  </StyledButton>
);

export default Button;
