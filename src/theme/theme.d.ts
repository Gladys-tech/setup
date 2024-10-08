
import { PaletteOptions, Palette } from '@mui/material';

declare module '@mui/material/styles/createPalette' {
  interface Palette {
    customColors: {
      main: string;
      primaryGradient: string;
      tableHeaderBg: string;
    };
  }
  
  interface PaletteOptions {
    customColors?: {
      main?: string;
      primaryGradient?: string;
      tableHeaderBg?: string;
    };
  }
}
