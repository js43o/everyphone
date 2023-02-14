import { Box } from '@mui/material';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2,
        bgcolor: 'bluegrey.lighter',
      }}
    >
      Footer
    </Box>
  );
}
