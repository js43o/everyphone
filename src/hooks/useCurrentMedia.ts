import { useMediaQuery, useTheme } from '@mui/material';

const useCurrentMedia = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));

  return { isMobile, isTablet };
};

export default useCurrentMedia;
