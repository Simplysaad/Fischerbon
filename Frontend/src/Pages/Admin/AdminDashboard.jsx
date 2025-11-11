import React from 'react';
import { useEffect, useState } from 'react';

import DashboardLayout from './Layout';
import axiosInstance from '../../utils/axios.util';
import useAuth from '../../context/AuthContext';

import NotificationsList from '../../Components/NotificationList';
import EnrollmentTable from '../../Components/EnrollmentTable';
import CoursesTable from '../../Components/CoursesTable';
import StatCard from '../../Components/StatCard';
import ProfileCard from '../../Components/ProfileCard';
import { Link } from 'react-router-dom';
import Loading from '../../Components/Loading';

const AdminDashboard = () => {
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
        setNotifications(response.data.notifications || []);
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
        <Loading overlay />
      </DashboardLayout>
    );
  return (
    <DashboardLayout>
      <div className="flex justify-end flex-col md:flex-row min-w-full min-h-full flex-wrap gap-2">
        <section
          id="main"
          className=" w-full md:min-w-[60%] lg:min-w-[60%] flex-1 "
        >
          <section id="overview" className="mb-12">
            <h1 className="text-3xl font-bold text-blue-600 my-6">Overview</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
              {stats.map(({ id, icon, label, value }) => (
                <StatCard key={id} icon={icon} label={label} value={value} />
              ))}
            </div>
          </section>
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
              <Link
                to="/admin/courses"
                className="bg-blue-600 rounded text-white py-2 px-4 hover:bg-blue-700 transition"
              >
                Manage
              </Link>
            </div>
            <div className="overflow-auto rounded-lg shadow bg-white p-4">
              <CoursesTable courses={courses} />
            </div>
          </section>

          {/* Notifications */}
          <section id="notifications" className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-blue-600">
                Notifications
              </h3>
              <Link
                to="/notifications"
                className="bg-blue-600 rounded text-white py-2 px-4 hover:bg-blue-700 transition"
              >
                Manage
              </Link>
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
                        message:
                          'Course "3D Modeling" updated with new lessons.',
                      },
                      {
                        id: 3,
                        message: 'Certificate issued to Alice Johnson.',
                      },
                    ]
              }
            />
          </section>
        </section>
        <div className="  flex flex-col w-full md:w-[30%] md:my-12  gap-4">
          <ProfileCard user={user} />
          <section id="extra" className="border h-auto "></section>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
