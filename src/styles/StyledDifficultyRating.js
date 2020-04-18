import styled from 'styled-components';
import { dash, rotate } from '.';

const StyledDifficultyCircle = styled.svg`
  animation: rotate 2s linear infinite;
  margin: -25px 0 0 -25px;
  width: 50px;
  height: 50px;

  & .path {
    stroke: #5652bf;
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }
`;

export const StyledDifficultyCircle;
