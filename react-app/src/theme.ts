import { createTheme } from '@mui/material/styles';

// Mirrors the default Angular Material setup (Indigo/Pink baseline) and the
// Roboto typography declared in the original index.html / styles.scss.
export const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, "Helvetica Neue", sans-serif',
  },
});
