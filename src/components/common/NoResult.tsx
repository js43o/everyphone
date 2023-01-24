import { Box, Typography } from '@mui/material';
import DeviceUnknownIcon from '@mui/icons-material/DeviceUnknown';

export default function NoResult() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      padding={3}
    >
      <DeviceUnknownIcon fontSize="large" />
      <Typography variant="body1">검색 결과가 없습니다.</Typography>
    </Box>
  );
}
