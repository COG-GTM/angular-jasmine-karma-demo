import { createTheme } from '@mui/material/styles';

// Approximates the Angular Material "indigo-pink" prebuilt theme used by the legacy app.
// Angular's color="warn" maps to MUI color="error" (same #f44336 red).
export const theme = createTheme({
  palette: {
    primary: { main: '#3f51b5' },
    secondary: { main: '#ff4081' },
    error: { main: '#f44336' },
    background: { default: '#fff' },
    text: { primary: 'rgba(0, 0, 0, 0.87)' },
  },
  typography: {
    fontFamily: 'Roboto, "Helvetica Neue", sans-serif',
    fontSize: 14,
  },
  components: {
    // mat-raised-button keeps the label's case and has no extra letter spacing (MUI uppercases).
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none', letterSpacing: 'normal' },
      },
    },
  },
});
