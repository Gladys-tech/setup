// src/theme.ts
import { createTheme, PaletteOptions } from '@mui/material';

const lightPalette: PaletteOptions = {
  primary: {
    main: '#1976d2', // Light theme primary color
  },
  secondary: {
    main: '#dc004e', // Light theme secondary color
  },
  customColors: {
    main: '#f0f0f0', // Custom color for light theme
    primaryGradient: 'linear-gradient(to right, #ff7e5f, #feb47b)', // Example gradient
    tableHeaderBg: '#e0e0e0', // Table header background
  },
  background: {
    default: '#ffffff', // Light background
    paper: '#ffffff', // Paper background
  },
  text: {
    primary: '#000000', // Primary text color
    secondary: '#555555', // Secondary text color
  },
};

const darkPalette: PaletteOptions = {
  primary: {
    main: '#90caf9', // Dark theme primary color
  },
  secondary: {
    main: '#f48fb1', // Dark theme secondary color
  },
  customColors: {
    main: '#121212', // Custom color for dark theme
    primaryGradient: 'linear-gradient(to right, #4b6cb7, #182848)', // Example gradient
    tableHeaderBg: '#333333', // Table header background
  },
  background: {
    default: '#121212', // Dark background
    paper: '#424242', // Paper background
  },
  text: {
    primary: '#ffffff', // Primary text color
    secondary: '#dddddd', // Secondary text color
  },
};

export const lightTheme = createTheme({ palette: lightPalette });
export const darkTheme = createTheme({ palette: darkPalette });
