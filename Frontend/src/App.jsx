
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/Auth/Login";
import SignupPage from './Pages/Auth/Signup'
import ResetPasswordPage from "./Pages/Auth/ResetPassword";
import ForgotPasswordPage from "./Pages/Auth/ForgotPassword";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Courses from "./Pages/Dashboard/Courses";
import Challenges from "./Pages/Dashboard/Challenges";
import Quizzes from "./Pages/Dashboard/Quizzes";
import Profile from "./Pages/Dashboard/Profile";
import AdminDashboard from "./Pages/AdminDashboard/AdminDashboard";
import CreateCourse from './Pages/AdminDashboard/CreateCourse'
import RegisterStudent from './Pages/AdminDashboard/RegisterStudent'
import AdminProfile from './Pages/AdminDashboard/AdminProfile'
import AddChallenge from "./Pages/AdminDashboard/AddChallenge";

const App = () => (
  <BrowserRouter>
      <Routes>

        {/* Auth */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/challenges" element={<Challenges />} />
        <Route path="/quizzes" element={<Quizzes />} />
        <Route path="/profile" element={<Profile />} />

        {/* AdminDashboard */}
        <Route path="/adminDashboard" element={<AdminDashboard />} />
        <Route path="/createCourse" element={<CreateCourse />} />
        <Route path="/registerStudent" element={<RegisterStudent />} />
        <Route path="/addChallenge" element={<AddChallenge />} />
        <Route path="/adminProfile" element={<AdminProfile />} />

        {/* Not found page */}
        <Route path="/*" element={<LoginPage />} />
        
      </Routes>
  </BrowserRouter>
);

export default App;