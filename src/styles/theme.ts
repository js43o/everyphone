import { createTheme } from '@mui/material';

const theme = createTheme({
  typography: {
    fontFamily: ['Noto Sans KR', 'Roboto', 'Bakbak One', 'sans-serif'].join(
      ','
    ),
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 320,
      md: 480,
      lg: 768,
      xl: 1024,
    },
  },
});

export default theme;
