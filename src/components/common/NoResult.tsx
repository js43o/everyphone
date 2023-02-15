import { Box, Typography } from '@mui/material';
import DeviceUnknownIcon from '@mui/icons-material/DeviceUnknown';

export default function NoResult() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        padding: 3,
      }}
    >
      <DeviceUnknownIcon fontSize="large" />
      <Typography variant="body1">검색 결과가 없습니다.</Typography>
    </Box>
  );
}
