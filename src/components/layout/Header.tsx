import Link from 'next/link';
import NavBar from './NavBar';
import Title from 'components/common/Title';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import NavDrawerButton from './NavDrawerButton';
import SearchPhoneButton from './SearchPhoneButton';

export default function Header() {
  const isMobile = useMediaQuery(useTheme().breakpoints.down('lg'));

  if (isMobile)
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: 1,
          background: 'white',
        }}
      >
        <NavDrawerButton />
        <Title>
          <Link href="/">EveryPhone</Link>
        </Title>
        <SearchPhoneButton />
      </Box>
    );

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', lg: 'row' },
        justifyContent: 'center',
        alignItems: 'center',
        gap: 3,
        padding: 1,
        background: 'white',
      }}
      component="header"
    >
      <Title>
        <Link href="/">EveryPhone</Link>
      </Title>
      <NavBar />
      <SearchPhoneButton />
    </Box>
  );
}
