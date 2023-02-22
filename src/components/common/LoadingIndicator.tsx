import { Box, CircularProgress } from '@mui/material';

export default function LoadingIndicator() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        gap: 1,
      }}
    >
      <CircularProgress />
      불러오는 중...
    </Box>
  );
}
