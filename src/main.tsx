import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
// Global styles first so component SCSS (imported via routes) wins on equal specificity, as in Angular.
import './styles/global.scss';
import './styles/mat-typography.scss';
import { routes } from './routes';
import { theme } from './theme';

const router = createBrowserRouter(routes);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* injectFirst lets ported component SCSS (e.g. `.card`) override MUI defaults, like Angular component styles did. */}
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </StyledEngineProvider>
  </StrictMode>,
);
