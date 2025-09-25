
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
import PostChallenge from "./Pages/AdminDashboard/PostChallenge";

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
        <Route path="/dashboard/admin" element={<AdminDashboard />} />
        <Route path="/course/create" element={<CreateCourse />} />
        <Route path="/student/register" element={<RegisterStudent />} />
        <Route path="/challenge/post" element={<PostChallenge />} />
        <Route path="/profile/admin" element={<AdminProfile />} />

        {/* Not found page */}
        <Route path="/*" element={<LoginPage />} />
        
      </Routes>
  </BrowserRouter>
);

export default App;