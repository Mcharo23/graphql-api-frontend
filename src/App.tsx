import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./screens/login";
import HomePage from "./screens/home";
import RegisterPage from "./screens/register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
