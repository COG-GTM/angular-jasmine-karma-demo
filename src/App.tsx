import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Items from "./pages/Items";
import Users from "./pages/Users";
import "./styles/global.scss";

const TITLE = "angular-jasmine-karma-demo";

export function App() {
  return (
    <BrowserRouter>
      <span>{TITLE} app is running!</span>
      <Routes>
        <Route path="/" element={<Navigate to="/users" replace />} />
        <Route path="/shop" element={<Items />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
