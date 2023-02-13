import Link from 'next/link';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import Title from 'components/common/Title';
import NavBar from './NavBar';
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
        <Link href="/"><Title /></Link>
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
        <Link href="/"><Title /></Link>
      <NavBar />
      <SearchPhoneButton />
    </Box>
  );
}
