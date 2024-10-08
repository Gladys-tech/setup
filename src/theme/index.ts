
import { createTheme } from '@mui/material/styles';
import DefaultPalette from './palette';

const getTheme = (mode: 'light' | 'dark', themeColor: 'primary' | 'secondary' | 'success' | 'error' | 'warning') => {
  const palette = DefaultPalette(mode, themeColor);

  return createTheme({
    palette: {
      ...palette,
    },
  });
};

export default getTheme;
