import { createTheme } from '@mui/material/styles';

// Mirrors Angular Material's indigo-pink prebuilt theme (primary / accent / warn).
export const theme = createTheme({
  palette: {
    primary: { main: '#3f51b5' },
    secondary: { main: '#ff4081' },
    error: { main: '#f44336' },
  },
  typography: {
    fontFamily: 'Roboto, "Helvetica Neue", sans-serif',
    fontSize: 14,
  },
  components: {
    // Angular Material 12 mat-raised-button metrics (no uppercase, 36px line height).
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontSize: 14,
          fontWeight: 500,
          lineHeight: '36px',
          letterSpacing: 'normal',
          padding: '0 16px',
          borderRadius: 4,
        },
      },
    },
  },
});
