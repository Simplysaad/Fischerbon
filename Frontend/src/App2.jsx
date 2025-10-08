import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';

import getUserDetails from './utils/getUserdetails';
// Dummy auth function (replace with real auth logic)
const useAuth = () => {
  return {
    name: 'saad',
    role: 'admin',
  };
};

// Role-based protected route wrapper
const user = useAuth();
const ProtectedRoute = ({ allowedRoles }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/404" replace />;
  }
  return <Outlet />;
};

import LoginPage from './Pages/Auth/Login';
import SignupPage from './Pages/Auth/Signup';
import ResetPasswordPage from './Pages/Auth/ResetPassword';
import ForgotPasswordPage from './Pages/Auth/ForgotPassword';

import Profile from './Pages/Auth/Profile';

import StudentDashboard from './Pages/Dashboard/Dashboard';
import Courses from './Pages/Dashboard/Courses';

import NotFound from './Pages/Public/404';
import MyCourses from './Pages/Student/MyEnrollments';
import AdminDashboard from './Pages/Admin/AdminDashboard';

import ManageCourses from './Pages/Admin/ManageCourses';
import Home from './Pages/Public/Home';

// Auth context for demo (replace with actual auth provider)
const AuthContext = React.createContext(null);

const App = () => {
  const [currentUser, setCurrentUser] = useState({});
  useEffect(() => {
    const user = getUserDetails();
    if (user) setCurrentUser(user);
  }, []);

  // 'admin' or 'student' or null if not logged in

  return (
    <AuthContext.Provider value={user}>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          {/* <Route path="/" element={<LoginPage />} /> */}

          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route
            path="/profile"
            element={<ProtectedRoute allowedRoles={['student', 'admin']} />}
          >
            <Route index element={<Profile />} />
          </Route>
          <Route path="/courses" element={<Courses />} />
          <Route
            path="/reset-password/:token"
            element={<ResetPasswordPage />}
          />

          {/* Student protected routes */}
          <Route element={<ProtectedRoute allowedRoles={['student']} />}>
            <Route path="/dashboard" element={<StudentDashboard />} />
            <Route path="/my-courses" element={<MyCourses />} />
            {/* <Route
              path="/my-courses/:courseId"
              element={<MyEnrollmentDetails />}
            /> */}
            {/* <Route
              path="/my-courses/:courseId/lesson/:lessonId"
              element={<Lesson />}
            /> */}
          </Route>

          {/* Admin protected routes */}
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            {/* <Route path="/admin/users" element={<ManageUsers />} /> */}
            <Route path="/admin/courses" element={<ManageCourses />} />
            {/* <Route
              path="/admin/courses/:courseId"
              element={<AdminCourseDetails />}
            /> */}
          </Route>

          {/* Catch all for no match - redirect to home or 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
