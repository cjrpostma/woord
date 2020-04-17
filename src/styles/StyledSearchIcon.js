import styled, { css } from 'styled-components';
import SearchIcon from '@material-ui/icons/Search';

const StyledRefreshIcon = styled(SearchIcon)`
  color: ${({ theme }) => theme.colors.magenta};

  && {
    display: block;
    font-size: ${({ theme }) => theme.fontSizes.lg};
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
