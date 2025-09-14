
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/Auth/Login";
import SignupPage from './Pages/Auth/Signup'
import ResetPasswordPage from "./Pages/Auth/ResetPassword";
import ForgotPasswordPage from "./Pages/Auth/ForgotPassword";

const App = () => (
  <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/*" element={<LoginPage />} />
      </Routes>
  </BrowserRouter>
);

export default App;