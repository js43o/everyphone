import { Container } from '@mui/material';

export default function Contents(props: { children: React.ReactNode }) {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flexGrow: 1,
        width: '100%',
        background: '#efefef',
        p: 2,
      }}
      maxWidth={false}
    >
      {props.children}
    </Container>
  );
}
