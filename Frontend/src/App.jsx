import React from 'react';
import { Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';

import LoginPage from './Pages/Auth/Login';
import SignupPage from './Pages/Auth/Signup';
import ResetPasswordPage from './Pages/Auth/ResetPassword';
import ForgotPasswordPage from './Pages/Auth/ForgotPassword';
import Profile from './Pages/Auth/Profile';

import StudentDashboard from './Pages/Student/Dashboard';
import CourseListing from './Pages/Public/CourseListing';
import CourseDetails from './Pages/Public/CourseDetails';
import NotFound from './Pages/Public/404';
import MyCourses from './Pages/Student/MyEnrollments';
import AdminDashboard from './Pages/Admin/AdminDashboard';

import ManageCourses from './Pages/Admin/ManageCourses';
import Home from './Pages/Public/Home';

import useAuth, { AuthProvider } from './context/AuthContext';
import LessonDetails from './Pages/Student/Lesson';

// ProtectedRoute Component with redirect to login preserving original path
const ProtectedRoute = ({ allowedRoles = null }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return <p>Loading...</p>;

  if (allowedRoles) {
    if (!user) {
      // Redirect to login, preserve the location they tried to go
      return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (!allowedRoles.includes(user.role)) {
      return <Navigate to="/404" replace />; // Or unauthorized page
    }
  }

  return <Outlet />;
};

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        <Route path="/courses" element={<CourseListing />} />
        <Route path="/courses/:slug" element={<CourseDetails />} />

        {/* Group routes that require authentication */}
        <Route element={<ProtectedRoute allowedRoles={['student', 'admin']} />}>
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* <Route element={<ProtectedRoute allowedRoles={['student']} />}> */}
        <Route path="/dashboard" element={<StudentDashboard />} />
        <Route path="/my-courses" element={<MyCourses />} />
        <Route
          path="/courses/:courseSlug/lessons/:lessonSlug"
          element={<LessonDetails />}
        />
        {/* </Route> */}

        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/admin/" element={<AdminDashboard />} />
          <Route path="/admin/courses" element={<ManageCourses />} />
        </Route>

        {/* 404 fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
