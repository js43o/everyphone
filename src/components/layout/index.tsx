import { Container } from '@mui/material';
import Header from './Header';
import Contents from './Contents';
import Footer from './Footer';

export default function Index(props: { children: React.ReactNode }) {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100%',
        bgcolor: 'bluegrey.main',
      }}
      maxWidth={false}
      disableGutters
    >
      <Header />
      <Contents>{props.children}</Contents>
      <Footer />
    </Container>
  );
}
