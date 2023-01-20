import Link from 'next/link';
import NavBar from './NavBar';
import Title from 'components/common/Title';
import { Box } from '@mui/material';

export default function Header() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', lg: 'row' },
        justifyContent: 'center',
        alignItems: 'center',
        gap: { xs: 1, lg: 3 },
        padding: 1,
        background: 'white',
      }}
      component="header"
    >
      <Title>
        <Link href="/">EveryPhone</Link>
      </Title>
      <NavBar />
    </Box>
  );
}
