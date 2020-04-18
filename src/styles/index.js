import { keyframes } from 'styled-components';

export const fadeIn = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`;

export const rotate = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

export const dash = keyframes`
  0 % {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }

  50 % {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }

  100 % {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
`;
