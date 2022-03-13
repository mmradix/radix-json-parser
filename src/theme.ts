import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

declare module '@mui/material/styles/createPalette' {
  interface PaletteColor {
    light: string;
    main: string;
    dark: string;
    medium: string;
    contrastText: string;
  }
  interface SimplePaletteColorOptions {
    light?: string;
    main: string;
    dark?: string;
    medium?: string;
    contrastText?: string;
  }
  interface Palette {
    lowNeutral: Palette['primary'];
    highNeutral: Palette['primary'];
  }
  interface PaletteOptions {
    lowNeutral: PaletteOptions['primary'];
    highNeutral: PaletteOptions['primary'];
  }
}

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: '#283470',
      light: '#4457BB',
      dark: '#111733',
      medium: '#384994',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#15A29C',
      light: '#68DED8',
      dark: '#084946',
      medium: '#2B7572',
      contrastText: '#FFFFFF',
    },
    error: {
      main: red.A400,
    },
    warning: {
      main: '#9447F5',
      light: '#D9BBFB',
    },
    info: {
      main: '#FF8A00',
      light: '#FFE3C2',
    },
    lowNeutral: {
      main: '#000000',
      light: '#A3A3A3',
      medium: '#666666',
      dark: '#292929',
    },
    highNeutral: {
      main: '#FFFFFF',
      light: '#F5F5F5',
      medium: '#E0E0E0',
      dark: '#CCCCCC',
    },
  },
  typography: {
    fontFamily: ['Inter', 'sans-serif'].join(','),
  },
});

export default theme;
