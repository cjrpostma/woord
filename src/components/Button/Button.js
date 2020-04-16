import React from 'react';

// components ------------------------------
import StyledButton from '../../styles/StyledButton';

const Button = ({ children, disabled, secondary }) => (
  <StyledButton disabled={disabled} secondary={secondary}>
    {children}
  </StyledButton>
);

export default Button;
