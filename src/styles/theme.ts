import { createTheme } from '@mui/material';

declare module '@mui/material/Divider' {
  interface DividerPropsVariantOverrides {
    bold: true;
  }
}

declare module '@mui/material/styles' {
  interface Palette {
    paper: Palette['primary'];
  }
  interface PaletteOptions {
    paper: PaletteOptions['primary'];
  }
}

const paletteColors = {
  paper: {
    main: '#eceff1',
    dark: '#cfd8dc',
    light: '#ffffff',
    contrastText: '#3e5060',
  },
};

const theme = createTheme({
  palette: paletteColors,
  components: {
    MuiChip: {
      styleOverrides: {
        root: {
          borderColor: paletteColors.paper.dark,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderColor: paletteColors.paper.dark,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          background: paletteColors.paper.dark,
        },
      },
      variants: [
        {
          props: { variant: 'bold' },
          style: {
            background: paletteColors.paper.contrastText,
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
      fontSize: '2.125rem',
      fontWeight: 'bold',
      margin: '1rem 0',
    },
    h2: {
      fontSize: '1.85rem',
      fontWeight: 'bold',
      margin: '0.75rem 0',
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 500,
      margin: '0.5rem 0',
    },
    h4: {
      fontSize: '1.3rem',
      fontWeight: 500,
      margin: '0.25rem 0',
    },
    h5: {
      fontSize: '1.125rem',
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
