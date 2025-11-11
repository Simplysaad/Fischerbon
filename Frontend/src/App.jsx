import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';

const LoginPage = lazy(() => import('./Pages/Auth/Login'));
const SignupPage = lazy(() => import('./Pages/Auth/Signup'));
const ResetPasswordPage = lazy(() => import('./Pages/Auth/ResetPassword'));
const ForgotPasswordPage = lazy(() => import('./Pages/Auth/ForgotPassword'));
const StudentDashboard = lazy(() => import('./Pages/Student/Dashboard'));
const CourseListing = lazy(() => import('./Pages/Public/CourseListing'));
const CourseDetails = lazy(() => import('./Pages/Public/CourseDetails'));
const NotFound = lazy(() => import('./Pages/Public/404'));
const MyCourses = lazy(() => import('./Pages/Student/MyEnrollments'));
const AdminDashboard = lazy(() => import('./Pages/Admin/AdminDashboard'));

const ManageCourses = lazy(() => import('./Pages/Admin/ManageCourses'));
const Home = lazy(() => import('./Pages/Public/Home'));
const LessonDetails = lazy(() => import('./Pages/Student/
const ProtectedRoute = ({ allowedRoles = null }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return <Loading />;

  if (allowedRoles) {
    if (!user) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (!allowedRoles.includes(user.role) && user.role !== 'admin') {
      return <Navigate to="/404" replace />;
    }
  }

  return <Outlet />;
};

function App() {
  // if (true) return <Loading overlay size="large" />;
  return (
    <>
      <AuthProvider>
        <Suspense fallback={<Loading overlay active size="large" />}>
          <ScrollToAnchor />
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route
              path="/reset-password/:token"
              element={<ResetPasswordPage />}
            />
            <Route path="/courses" element={<CourseListing />} />
            <Route path="/courses/:slug" element={<CourseDetails />} />

            {/* Group routes that require authentication */}
            <Route
              element={<ProtectedRoute allowedRoles={['student', 'admin']} />}
            >
              {/* <Route path="/profile" element={<Profile />} /> */}
            </Route>

            <Route element={<ProtectedRoute allowedRoles={['student']} />}>
              <Route path="/dashboard" element={<StudentDashboard />} />
              <Route path="/my-courses" element={<MyCourses />} />
              <Route
                path="/courses/:courseSlug/lessons/:lessonSlug"
                element={<LessonDetails />}
              />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
              <Route path="/admin/" element={<AdminDashboard />} />
              <Route path="/admin/courses" element={<ManageCourses />} />
            </Route>

            {/* 404 fallback */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </AuthProvider>
      <Analytics />
    </>
  );
}

export default App;
