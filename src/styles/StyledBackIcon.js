import styled from 'styled-components';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const StyledBackIcon = styled(ArrowBackIcon)`
  color: ${({ theme }) => theme.colors.magenta};

  && {
    display: block;
    font-size: ${({ theme }) => theme.fontSizes.lg};
    margin: auto;
    transition: transform 150ms ease-in-out 100ms;
  }

  &:hover {
    cursor: pointer;
    transform: scale(0.9);
  }
`;

export default StyledBackIcon;
