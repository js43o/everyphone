import { createTheme } from '@mui/material';

declare module '@mui/material/Divider' {
  interface DividerPropsVariantOverrides {
    bold: true;
  }
}

const theme = createTheme({
  components: {
    MuiDivider: {
      variants: [
        {
          props: { variant: 'bold' },
          style: {
            background: '#888888',
          },
        },
      ],
    },
  },
  typography: {
    fontFamily: ['Noto Sans KR', 'Roboto', 'Bakbak One', 'sans-serif'].join(
      ','
    ),
    h1: {
      fontSize: '2.25rem',
      fontWeight: 'bold',
      margin: '1rem 0',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 'bold',
      margin: '0.75rem 0',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
      margin: '0.5rem 0',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
      margin: '0.25rem 0',
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
    },
    subtitle1: {
      fontSize: '1.125rem',
      fontWeight: 500,
    },
    subtitle2: {
      fontSize: '1rem',
      fontWeight: 500,
    },
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
