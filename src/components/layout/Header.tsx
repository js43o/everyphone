import Link from 'next/link';
import { Box, IconButton, useMediaQuery, useTheme } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Title from 'components/common/Title';
import NavBar from './NavBar';
import NavDrawerButton from './NavDrawerButton';
import SearchPhoneButton from './SearchPhoneButton';

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
          </Box>
        </>
      )}
    </Box>
  );
}
