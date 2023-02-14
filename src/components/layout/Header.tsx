import Link from 'next/link';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import Title from 'components/common/Title';
import NavBar from './NavBar';
import NavDrawerButton from './NavDrawerButton';
import SearchPhoneButton from './SearchPhoneButton';

export default function Header() {
  const isMobile = useMediaQuery(useTheme().breakpoints.down('lg'));

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: { xs: 'space-between', lg: 'center' },
        alignItems: 'center',
        gap: { xs: 0, lg: 3 },
        padding: 1,
        bgcolor: 'bluegrey.lighter',
      }}
    >
      {isMobile ? (
        <>
          <NavDrawerButton />
          <Link href="/">
            <Title />
          </Link>
          <SearchPhoneButton />
        </>
      ) : (
        <>
          <Link href="/">
            <Title />
          </Link>
          <NavBar />
          <SearchPhoneButton />
        </>
      )}
    </Box>
  );
}
