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
});
