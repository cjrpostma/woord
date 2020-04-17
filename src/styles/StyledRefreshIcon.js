import styled, { css } from 'styled-components';
import CachedIcon from '@material-ui/icons/Cached';

const StyledRefreshIcon = styled(CachedIcon)`
  color: ${({ theme }) => theme.colors.magenta};

  && {
    display: block;
    font-size: ${({ theme }) => theme.fontSizes.lg};
    margin: 2rem auto;
    transition: transform 150ms ease-in-out 100ms;
  }

  &:hover {
    cursor: pointer;
    transform: scale(0.9);
  }

  ${({ disabled }) =>
    disabled &&
    css`
      color: ${({ theme }) => theme.colors.grayLighter};

      &:hover {
        cursor: auto;
        transform: scale(1);
      }
    `}
`;

export default StyledRefreshIcon;
