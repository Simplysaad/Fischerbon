import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import ProtectedRoute from './Components/ProtectedRoute';
import LoginPage from './Pages/Auth/Login';
import SignupPage from './Pages/Auth/Signup';
import ResetPasswordPage from './Pages/Auth/ResetPassword';
import ForgotPasswordPage from './Pages/Auth/ForgotPassword';
import Dashboard from './Pages/Dashboard/Dashboard';
import Courses from './Pages/Dashboard/Courses';
import Challenges from './Pages/Dashboard/Challenges';
import Profile from './Pages/Dashboard/Profile';
import AdminDashboard from './Pages/AdminDashboard/AdminDashboard';
import CreateCourse from './Pages/AdminDashboard/CreateCourse';
import RegisterStudent from './Pages/AdminDashboard/RegisterStudent';
import AdminProfile from './Pages/AdminDashboard/AdminProfile';
import PostChallenge from './Pages/AdminDashboard/PostChallenge';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Auth */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />

          {/* Protected Dashboard */}
          <Route
            path="/dashboard"
            element={
              // <ProtectedRoute>
              <Dashboard />
              // </ProtectedRoute>
            }
          />
          <Route
            path="/enrollment"
            element={
              // <ProtectedRoute>
              <Courses />
              // </ProtectedRoute>
            }
          />

          <Route
            path="/enrollment/:course"
            element={
              // <ProtectedRoute>
              <Courses />
              // </ProtectedRoute>
            }
          />

          <Route
            path="/challenges"
            element={
              // <ProtectedRoute>
              <Challenges />
              // </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              // <ProtectedRoute>
              <Profile />
              // </ProtectedRoute>
            }
          />

          {/* Protected Admin Dashboard */}
          <Route
            path="/dashboard/admin"
            element={
              // <ProtectedRoute>
              <AdminDashboard />
              // </ProtectedRoute>
            }
          />
          <Route
            path="/courses/create"
            element={
              // <ProtectedRoute>
              <CreateCourse />
              // </ProtectedRoute>
            }
          />
          <Route
            path="/student/register"
            element={
              // <ProtectedRoute>
              <RegisterStudent />
              // </ProtectedRoute>
            }
          />
          <Route
            path="/challenge/post"
            element={
              // <ProtectedRoute>
              <PostChallenge />
              // </ProtectedRoute>
            }
          />
          <Route
            path="/profile/admin"
            element={
              // <ProtectedRoute>
              <AdminProfile />
              // </ProtectedRoute>
            }
          />

          {/* Not found page */}
          <Route path="/*" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
