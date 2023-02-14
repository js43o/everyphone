import { Grid, Box } from '@mui/material';

export default function VsCircle() {
  return (
    <Grid
      item
      xs={2}
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 1,
          width: '2.5rem',
          height: '2.5rem',
          borderRadius: '100%',
          bgcolor: 'bluegrey.darker',
          color: 'bluegrey.lighter',
          fontFamily: 'Bakbak One',
          fontSize: '1.25rem',
        }}
      >
        VS
      </Box>
    </Grid>
  );
}
