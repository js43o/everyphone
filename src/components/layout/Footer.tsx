import { Box, Button } from '@mui/material';

export default function Footer() {
  const scrollToTop = () => {
    document.body.scrollTo({ top: 0, behavior: 'auto' });
  };

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
      <Button onClick={scrollToTop}>맨 위로</Button>
    </Box>
  );
}
