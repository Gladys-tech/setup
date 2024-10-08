import { PaletteMode, PaletteOptions } from '@mui/material';
import { ThemeColor } from '../@core/layouts/types';

interface CustomPalette extends PaletteOptions {
  customColors: {
    main: string;
    primaryGradient: string;
    tableHeaderBg: string;
  };
}

// Define lighter and darker variants for tangerine and spring bud
const getColorVariants = (mainColor: string, lightColor: string, darkColor: string) => {
  return { light: lightColor, main: mainColor, dark: darkColor };
};

const DefaultPalette = (mode: PaletteMode, themeColor: ThemeColor): CustomPalette => {
  // Colors
  const primaryColors = getColorVariants('#F58B00', '#F6A700', '#C67A00'); // Tangerine
  const secondaryColors = getColorVariants('#92E000', '#E1FF00', '#2AA10F'); // Spring Bud

  return {
    customColors: {
      main: mode === 'light' ? '#FFFFFF' : '#2C3E50', // Set your custom main color
      primaryGradient: '#4285F4',
      tableHeaderBg: mode === 'light' ? '#FFFFFF' : '#303841',
    },
    common: {
      black: '#222831',
      white: '#FFFFFF',
    },
    mode: mode,
    primary: {
      light: primaryColors.light,
      main: primaryColors.main,
      dark: primaryColors.dark,
      contrastText: '#FFF',
    },
    secondary: {
      light: secondaryColors.light,
      main: secondaryColors.main,
      dark: secondaryColors.dark,
      contrastText: '#FFF',
    },
    success: {
      light: '#81C784',
      main: '#66BB6A',
      dark: '#388E3C',
      contrastText: '#FFF',
    },
    error: {
      light: '#FF8A80',
      main: '#FF5252',
      dark: '#E53935',
      contrastText: '#FFF',
    },
    warning: {
      light: '#FFE082',
      main: '#FFC107',
      dark: '#FFA000',
      contrastText: '#FFF',
    },
    info: {
      light: '#29B6F6',
      main: '#039BE5',
      dark: '#0288D1',
      contrastText: '#FFF',
    },
    grey: {
      50: '#FFFFFF',
      100: '#FFFFFF',
      200: '#FFFFFF',
      300: '#FFFFFF',
      400: '#FFFFFF',
      500: '#FFFFFF',
      600: '#FFFFFF',
      700: '#FFFFFF',
      800: '#FFFFFF',
      900: '#FFFFFF',
      A100: '#FFFFFF',
      A200: '#FFFFFF',
      A400: '#FFFFFF',
      A700: '#FFFFFF',
    },
    text: {
      primary: `rgba(${mode === 'light' ? '0,0,0' : '255,255,255'}, 0.87)`,
      secondary: `rgba(${mode === 'light' ? '0,0,0' : '255,255,255'}, 0.68)`,
      disabled: `rgba(${mode === 'light' ? '0,0,0' : '255,255,255'}, 0.38)`,
    },
    divider: `rgba(0, 0, 0, 0.12)`,
    background: {
      paper: mode === 'light' ? '#FFFFFF' : '#2C3E50',
      default: mode === 'light' ? 
        // 'linear-gradient(to bottom, #FFFFFF 80%, #E1FF00 20%)' : 
        'radial-gradient(circle at bottom, #FFFFFF 80%, #92E000 20%)':
        '#1A252F',
    },
    action: {
      active: `rgba(0, 0, 0, 0.54)`,
      hover: `rgba(0, 0, 0, 0.04)`,
      selected: `rgba(0, 0, 0, 0.08)`,
      disabled: `rgba(0, 0, 0, 0.3)`,
      disabledBackground: `rgba(0, 0, 0, 0.18)`,
      focus: `rgba(0, 0, 0, 0.12)`,
    },
  };
};

export default DefaultPalette;
