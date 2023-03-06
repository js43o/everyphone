import { createTheme } from '@mui/material';

declare module '@mui/material/styles' {
  interface Palette {
    bluegrey: Palette['primary'];
  }
  interface PaletteOptions {
    bluegrey: PaletteOptions['primary'];
  }
}

const paletteColors = {
  bluegrey: {
    main: '#eceff1',
    dark: '#d3dade',
    darker: '#b6c1c9',
    darkest: '#98a8b3',
    light: '#fbfbfc',
    lighter: '#ffffff',
    contrastText: '#3e5060',
    black: 'black',
  },
};

const theme = createTheme({
  palette: paletteColors,
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderColor: paletteColors.bluegrey.dark,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        filled: {
          background: paletteColors.bluegrey.dark,
        },
        outlined: {
          borderColor: paletteColors.bluegrey.dark,
        },
        deleteIcon: {
          color: paletteColors.bluegrey.darkest,
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: paletteColors.bluegrey.contrastText,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          background: paletteColors.bluegrey.lighter,
        },
        notchedOutline: {
          borderColor: paletteColors.bluegrey.dark,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderColor: paletteColors.bluegrey.dark,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          '::before': {
            borderColor: paletteColors.bluegrey.dark,
          },
          '::after': {
            borderColor: paletteColors.bluegrey.dark,
          },
          borderColor: paletteColors.bluegrey.dark,
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        divider: {
          borderColor: paletteColors.bluegrey.dark,
        },
      },
    },
  },
  typography: {
    fontFamily: ['Noto Sans KR', 'Roboto', 'Bakbak One', 'sans-serif'].join(
      ','
    ),
    h1: {
      fontSize: '2rem',
      fontWeight: 'bold',
      margin: '1rem 0',
    },
    h2: {
      fontSize: '1.75rem',
      fontWeight: 'bold',
      margin: '0.75rem 0',
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 500,
      margin: '0.5rem 0',
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 500,
      margin: '0.25rem 0',
    },
    h5: {
      fontSize: '1.125rem',
      fontWeight: 500,
      margin: 0,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
      margin: 0,
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500,
    },
    subtitle2: {
      fontSize: '0.85rem',
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
