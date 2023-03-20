import Link from 'next/link';
import {
  Box,
  Button,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Title from 'components/common/Title';
import NavBar from './NavBar';
import NavDrawerButton from './NavDrawerButton';
import SearchPhoneButton from './SearchPhoneButton';
import { signIn, useSession } from 'next-auth/react';

const FavoriteButton = () => {
  return (
    <Link href="/favorite">
      <IconButton
        sx={{
          width: 48,
          height: 48,
        }}
      >
        <FavoriteIcon />
      </IconButton>
    </Link>
  );
};

export default function Header() {
  const isMobile = useMediaQuery(useTheme().breakpoints.down('lg'));
  const { data: session, status } = useSession();

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
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <SearchPhoneButton />
          </Box>
        </>
      ) : (
        <>
          <Link href="/">
            <Title />
          </Link>
          <NavBar />
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <SearchPhoneButton />
            <FavoriteButton />
            <Button onClick={() => signIn('github')}>Github 로그인</Button>
            <h6>{session?.user?.name}</h6>
          </Box>
        </>
      )}
    </Box>
  );
}
