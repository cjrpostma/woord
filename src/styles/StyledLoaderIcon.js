import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';

const StyledLoaderIcon = styled(CircularProgress)`
  && {
    color: ${({ theme }) => theme.colors.magenta};
    display: block;
    font-size: ${({ theme }) => theme.fontSizes.lg};
    margin: 2rem auto;
    transition: transform 150ms ease-in-out 100ms;
  }
`;

export default StyledLoaderIcon;
