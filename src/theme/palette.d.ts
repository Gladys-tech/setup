import { Palette } from '@mui/material/styles/createPalette';

declare module '@mui/material/styles/createPalette' {
  interface Palette {
    customColors: {
      main: string;
      primaryGradient: string;
      tableHeaderBg: string;
    };
  }

  interface PaletteOptions {
    customColors: {
      main?: string;
      primaryGradient?: string;
      tableHeaderBg?: string;
    };
  }
}
