import { Users, ClipboardCheck, BookOpen, Bell } from 'lucide-react';
import { useEffect, useState } from 'react';
import DashboardLayout from './Layout';
import axiosInstance from '../../utils/axios.util';
import useAuth from '../../context/AuthContext';

// Icon map utility
const iconMap = {
  Users,
  ClipboardCheck,
  BookOpen,
  Bell,
};

// Empty message component for empty states
function EmptyMessage({ message }) {
  return <p className="text-center text-gray-500 py-10">{message}</p>;
}

// Stats card component
function StatCard({ icon, label, value }) {
  const IconComponent = iconMap[icon];
  return (
    <div className="bg-white rounded-lg shadow p-6 flex items-center space-x-4">
      <IconComponent className="h-10 w-10 text-blue-600 flex-shrink-0" />
      <div>
        <p className="text-2xl font-semibold">{value}</p>
        <p className="text-gray-600 font-medium">{label}</p>
      </div>
    </div>
  );
}

// Enrollment table component
function EnrollmentTable({ enrollments }) {
  if (!enrollments.length) return <EmptyMessage message="No enrollments yet" />;

  return (
    <table className="min-w-full divide-y divide-gray-200 rounded">
      <thead className="bg-blue-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-semibold text-blue-600 uppercase tracking-wide">
            Learner Name
          </th>
          <th className="px-6 py-3 text-left text-xs font-semibold text-blue-600 uppercase tracking-wide">
            Status
          </th>
          <th className="px-6 py-3 text-left text-xs font-semibold text-blue-600 uppercase tracking-wide">
            Progress
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
        {enrollments.map(({ id, name, status, progress }) => (
          <tr key={id} className="hover:bg-blue-50">
            <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
              {name}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">{status}</td>
            <td className="px-6 py-4 whitespace-nowrap">{progress}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// Courses table component
function CoursesTable({ courses }) {
  if (!courses || courses.length === 0) {
    return <EmptyMessage message="No courses yet" />;
  }

  return (
    <table className="min-w-full divide-y divide-gray-200 rounded">
      <thead className="bg-blue-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-semibold text-blue-600 uppercase tracking-wide">
            Title
          </th>
          <th className="px-6 py-3 text-left text-xs font-semibold text-blue-600 uppercase tracking-wide">
            Description
          </th>
          <th className="px-6 py-3 text-left text-xs font-semibold text-blue-600 uppercase tracking-wide">
            Price (₦)
          </th>
          <th className="px-6 py-3 text-left text-xs font-semibold text-blue-600 uppercase tracking-wide">
            Enrollments
          </th>
          <th className="px-6 py-3 text-left text-xs font-semibold text-blue-600 uppercase tracking-wide">
            Date Created
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
        {courses.map(
          ({ id, title, enrollments, description, createdAt, price }) => (
            <tr key={id} className="hover:bg-blue-50">
              <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                <a href={`/admin/courses/${title.split(' ').join('-')}-${id}`}>
                  {title}
                </a>
              </td>
              <td className="px-6 py-4 whitespace-nowrap truncate max-w-xs">
                {description}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                ₦{price.toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                {enrollments}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {new Date(createdAt).toLocaleDateString()}
              </td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
}

// Notification list component
function NotificationsList({ notifications }) {
  if (!notifications || notifications.length === 0) {
    return <EmptyMessage message="No notifications right now" />;
  }

  return (
    <ul className="bg-white rounded-lg shadow divide-y divide-gray-200">
      {notifications.map(({ id, message }) => (
        <li
          key={id}
          className="px-6 py-4 hover:bg-blue-50 cursor-pointer"
          tabIndex={0}
          role="button"
          aria-label={`Notification: ${message}`}
        >
          {message}
        </li>
      ))}
    </ul>
  );
}

export default function DashboardContent() {
  const [enrollments, setEnrollments] = useState([]);
  const [stats, setStats] = useState([]);
  const [courses, setCourses] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    async function getDashboardInfo() {
      try {
        const { data: response } = await axiosInstance.get('/admin/dashboard');

        if (!response.success) {
          console.error('API Error:', response.message);
          setLoading(false);
          return;
        }

        setStats(response.data.stats);
        setEnrollments(response.data.enrollments);
        setCourses(response.data.courses);
        setNotifications(response.data.notifications || []); // updated to use backend notifications if available
      } catch (err) {
        console.error('Error fetching dashboard info:', err);
      } finally {
        setLoading(false);
      }
    }

    getDashboardInfo();
  }, []);

  if (loading)
    return (
      <DashboardLayout>
        <div className="text-center py-20 text-gray-600 font-semibold">
          Loading dashboard data...
        </div>
      </DashboardLayout>
    );

  return (
    <DashboardLayout>
      {/* Dashboard Overview */}
      <section id="overview" className="mb-12">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">Overview</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
          {stats.map(({ id, icon, label, value }) => (
            <StatCard key={id} icon={icon} label={label} value={value} />
          ))}
        </div>
      </section>

      {/* Enrollment Management */}
      <section id="enrollment" className="mb-12">
        <h3 className="text-2xl font-semibold text-blue-600 mb-6">
          Enrollments
        </h3>
        <div className="overflow-auto rounded-lg shadow bg-white p-4">
          <EnrollmentTable enrollments={enrollments} />
        </div>
      </section>

      {/* Courses */}
      <section id="courses" className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-blue-600">Courses</h3>
          <a
            href="/admin/courses"
            className="bg-blue-600 rounded text-white py-2 px-4 hover:bg-blue-700 transition"
          >
            Manage
          </a>
        </div>
        <div className="overflow-auto rounded-lg shadow bg-white p-4">
          <CoursesTable courses={courses} />
        </div>
      </section>

      {/* Notifications */}
      <section id="notifications" className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-blue-600">Notifications</h3>
          <a
            href="/notifications"
            className="bg-blue-600 rounded text-white py-2 px-4 hover:bg-blue-700 transition"
          >
            Manage
          </a>
        </div>
        <NotificationsList
          notifications={
            notifications.length
              ? notifications
              : [
                  {
                    id: 1,
                    message: 'New learner Bob Smith joined the wait-list.',
                  },
                  {
                    id: 2,
                    message: 'Course "3D Modeling" updated with new lessons.',
                  },
                  { id: 3, message: 'Certificate issued to Alice Johnson.' },
                ]
          }
        />
      </section>

      {/* Admin Profile */}
      <section id="profile" className="mb-12">
        <h3 className="text-xl font-semibold text-blue-600 mb-6">
          Admin Profile
        </h3>
        <div className="bg-white rounded-lg shadow p-6 text-gray-700">
          <p>
            <strong>Name:</strong> {user?.name ?? 'Admin'}
          </p>
          <p>
            <strong>Email:</strong> {user?.email ?? 'admin@example.com'}
          </p>
          <p className="mt-2">
            Manage your instructor profile, update contact info, and view
            platform usage stats here.
          </p>
        </div>
      </section>
    </DashboardLayout>
  );
}
