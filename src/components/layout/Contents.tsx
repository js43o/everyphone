import { Container } from '@mui/material';

export default function Contents(props: { children: React.ReactNode }) {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        padding: 2,
      }}
      maxWidth="xl"
    >
      {props.children}
    </Container>
  );
}
