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
          <Route path="/" element={<LoginPage />} />

          {/* Auth */}
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
            path="/courses"
            element={
              // <ProtectedRoute>
              <Courses />
              // </ProtectedRoute>
            }
          />

          <Route
            path="/courses/:courseId"
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

// ### General (Accessible to Both Roles or Public)
// - `/` - Home page
// - `/login` - Login page
// - `/signup` - Signup/Registration page
// - `/forgot-password` - Password recovery page
// - `/profile` - User profile and settings
// - `/courses` - List of all courses (for browsing or enrollment)
// - `/courses/:courseId` - Course details and content overview
// - `/contact` - Contact page
// - `/about` - About the platform

// ***

// ### Student Routes
// - `/dashboard` - Student dashboard showing enrolled courses, progress summary, announcements
// - `/my-courses` - List of courses the student is enrolled in
// - `/my-courses/:courseId` - Detailed course view with lectures, assignments, quizzes
// - `/my-courses/:courseId/lecture/:lectureId` - Lecture video or materials
// - `/my-courses/:courseId/assignments` - Assignments list and submission page
// - `/my-courses/:courseId/quizzes` - Quizzes and tests page
// - `/my-courses/:courseId/results` - Grades and feedback for tests and assignments
// - `/progress` - Detailed progress tracking across courses
// - `/messages` - Messaging with instructors or support

// ***

// ### Admin Routes
// - `/admin/dashboard` - Admin overview of platform metrics, user statistics
// - `/admin/users` - User management (view, add, edit, delete users - students, instructors, admins)
// - `/admin/courses` - Manage courses (list, create, edit, delete courses)
// - `/admin/courses/:courseId` - Detailed course management (content, lectures, assignments)
// - `/admin/courses/:courseId/assignments` - Manage assignments for a course
// - `/admin/courses/:courseId/quizzes` - Manage quizzes for a course
// - `/admin/reports` - Analytics and reports on usage, progress, revenue
// - `/admin/settings` - Platform settings and configuration
// - `/admin/notifications` - Manage site-wide announcements and notifications
