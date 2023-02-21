import { Box, styled } from '@mui/material';
import SyncIcon from '@mui/icons-material/Sync';
import { rotateLeft } from 'styles/keyframes';

const LoadingIndicatorIcon = styled(SyncIcon)`
  font-size: 2rem;
  animation: 1s linear infinite ${rotateLeft};
`;

export default function LoadingIndicator() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        padding: 3,
      }}
    >
      <LoadingIndicatorIcon />
      불러오는 중...
    </Box>
  );
}
