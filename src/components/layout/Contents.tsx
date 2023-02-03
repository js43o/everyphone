import { Container } from '@mui/material';

export default function Contents(props: { children: React.ReactNode }) {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        px: {
          sx: 0,
          lg: 2,
        },
        py: 2,
      }}
      maxWidth="xl"
      disableGutters
    >
      {props.children}
    </Container>
  );
}
