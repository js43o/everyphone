import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import { Box, IconButton, useMediaQuery, useTheme } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LoginIcon from '@mui/icons-material/Login';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Title from 'components/common/Title';
import NavBar from './NavBar';
import NavDrawerButton from './NavDrawerButton';
import SearchPhoneButton from './SearchPhoneButton';
import LinkIconButton from 'components/common/LinkIconButton';
import useCurrentMedia from 'hooks/useCurrentMedia';

export default function Header() {
  const { isTablet } = useCurrentMedia();
  const { data: session } = useSession();

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
      {isTablet ? (
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
            <LinkIconButton href="/favorite" IconComponent={<FavoriteIcon />} />
            {session ? (
              <LinkIconButton
                href="/auth/account"
                IconComponent={<AccountCircleIcon />}
              />
            ) : (
              <>
                <IconButton onClick={() => signIn()}>
                  <LoginIcon />
                </IconButton>
              </>
            )}
          </Box>
        </>
      )}
    </Box>
  );
}
