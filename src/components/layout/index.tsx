import Header from './Header';
import Contents from './Contents';
import Footer from './Footer';
import { Container } from '@mui/material';

export default function Index(props: { children: React.ReactNode }) {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: '100%',
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
