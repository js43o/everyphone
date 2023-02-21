import { keyframes } from '@mui/material';

export const rotateLeft = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(-360deg);
  }
`;

export const rotateRight = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
