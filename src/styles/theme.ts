import { createTheme } from '@mui/material';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    semibold: React.CSSProperties;
    bold: React.CSSProperties;
    secondary: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    semibold?: React.CSSProperties;
    bold?: React.CSSProperties;
    secondary?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    semibold: true;
    bold: true;
    secondary: true;
  }
}

const theme = createTheme({
  typography: {
    fontFamily: ['Noto Sans KR', 'Roboto', 'Bakbak One', 'sans-serif'].join(
      ','
    ),
    semibold: {
      fontWeight: 500,
    },
    bold: {
      fontWeight: 800,
    },
    secondary: {
      fontSize: 12,
      color: 'grey',
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
