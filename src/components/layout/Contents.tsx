import { Container } from '@mui/material';

export default function Contents(props: { children: React.ReactNode }) {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        padding: {
          sx: 0,
          lg: 2,
        },
      }}
      maxWidth="xl"
      disableGutters
    >
      {props.children}
    </Container>
  );
}
