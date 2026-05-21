import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import UsersPage from "./pages/UsersPage";
import ShopPage from "./pages/ShopPage";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#ff4081",
    },
  },
  typography: {
    fontFamily: 'Roboto, "Helvetica Neue", sans-serif',
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <div>
          <span>angular-jasmine-karma-demo app is running!</span>
          <Routes>
            <Route path="/users" element={<UsersPage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="*" element={<Navigate to="/users" replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}
