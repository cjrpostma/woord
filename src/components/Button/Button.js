import React from 'react';

// components ------------------------------
import StyledButton from '../../styles/StyledButton';

const Button = ({ children, secondary }) => (
  <StyledButton secondary={secondary}>{children}</StyledButton>
);

export default Button;
