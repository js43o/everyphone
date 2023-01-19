import Link from 'next/link';
import NavBar from './NavBar';
import Title from 'components/common/Title';
import { Box } from '@mui/material';

export default function Header() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'center',
        alignItems: 'center',
        gap: { xs: 1, sm: 4 },
        p: 2,
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
