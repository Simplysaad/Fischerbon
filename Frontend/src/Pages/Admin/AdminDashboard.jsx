export const dashboardStats = [
  { id: 1, icon: 'Users', label: 'Enrolled Learners', value: 124 },
  {
    id: 2,
    icon: 'ClipboardCheck',
    label: 'Course Completion Rate',
    value: '89%',
  },
  { id: 3, icon: 'BookOpen', label: 'Courses Available', value: 3 },
  { id: 4, icon: 'Bell', label: 'New Notifications', value: 7 },
];

export const enrollmentsOverview = [
  { id: 1, name: 'Alice Johnson', status: 'Enrolled', progress: '75%' },
  { id: 2, name: 'Bob Smith', status: 'Wait-listed', progress: '0%' },
  { id: 3, name: 'Catherine Lee', status: 'Enrolled', progress: '40%' },
];

export const certificationsOverview = [
  {
    id: 1,
    learner: 'Alice Johnson',
    course: 'AutoCAD Basics',
    date: '2025-09-20',
  },
  {
    id: 2,
    learner: 'David Martin',
    course: 'Advanced CAD',
    date: '2025-09-15',
  },
];

export const notificationsList = [
  { id: 1, message: 'New learner Bob Smith joined the wait-list.' },
  { id: 2, message: 'Course "3D Modeling" updated with new lessons.' },
  { id: 3, message: 'Certificate issued to Alice Johnson.' },
];

import {
  Users,
  ClipboardCheck,
  BookOpen,
  Bell,
  UserCircle,
} from 'lucide-react';
import DashboardLayout from './Layout';

const iconMap = {
  Users: Users,
  ClipboardCheck: ClipboardCheck,
  BookOpen: BookOpen,
  Bell: Bell,
};

export default function DashboardContent() {
  return (
    <DashboardLayout>
      {/* Dashboard Overview */}
      <section id="overview" className="mb-12">
        <h3 className="text-3xl font-bold text-blue-600 mb-6">
          Dashboard Overview
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {dashboardStats.map(({ id, icon, label, value }) => {
            const IconComponent = iconMap[icon];
            return (
              <div
                key={id}
                className="bg-white rounded-lg shadow p-6 flex items-center space-x-4"
              >
                <IconComponent className="h-10 w-10 text-blue-600 flex-shrink-0" />
                <div>
                  <p className="text-2xl font-semibold">{value}</p>
                  <p className="text-gray-600 font-medium">{label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Enrollment Management */}
      <section id="enrollment" className="mb-12">
        <h3 className="text-3xl font-bold text-blue-600 mb-6">
          Enrollment Management
        </h3>
        <div className="overflow-auto rounded-lg shadow bg-white">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-semibold text-blue-600 uppercase tracking-wider"
                >
                  Learner Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-semibold text-blue-600 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-semibold text-blue-600 uppercase tracking-wider"
                >
                  Progress
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {enrollmentsOverview.map(({ id, name, status, progress }) => (
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
        </div>
      </section>

      {/* Certifications */}
      <section id="certifications" className="mb-12">
        <h3 className="text-3xl font-bold text-blue-600 mb-6">
          Certifications
        </h3>
        <div className="overflow-auto rounded-lg shadow bg-white">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-semibold text-blue-600 uppercase tracking-wider"
                >
                  Learner
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-semibold text-blue-600 uppercase tracking-wider"
                >
                  Course
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-semibold text-blue-600 uppercase tracking-wider"
                >
                  Date Issued
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {certificationsOverview.map(({ id, learner, course, date }) => (
                <tr key={id} className="hover:bg-blue-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                    {learner}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{course}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Notifications */}
      <section id="notifications" className="mb-12">
        <h3 className="text-3xl font-bold text-blue-600 mb-6">Notifications</h3>
        <ul className="bg-white rounded-lg shadow divide-y divide-gray-200">
          {notificationsList.map(({ id, message }) => (
            <li key={id} className="px-6 py-4 hover:bg-blue-50 cursor-pointer">
              {message}
            </li>
          ))}
        </ul>
      </section>

      {/* Admin Profile */}
      <section id="profile" className="mb-12">
        <h3 className="text-3xl font-bold text-blue-600 mb-6">Admin Profile</h3>
        <div className="bg-white rounded-lg shadow p-6 text-gray-700">
          <p>
            <strong>Name:</strong> John Doe
          </p>
          <p>
            <strong>Email:</strong> johndoe@example.com
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
