import { createTheme } from '@mui/material/styles';

// Mirrors Angular Material's prebuilt "indigo-pink" theme as used by the
// original app: indigo primary, pink accent, and a red "warn" palette
// (Material red 500 = #f44336) which the Angular app uses via color="warn".
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
    MuiButton: {
      styleOverrides: {
        // Angular Material buttons preserve label casing.
        root: { textTransform: 'none' },
      },
    },
  },
});
