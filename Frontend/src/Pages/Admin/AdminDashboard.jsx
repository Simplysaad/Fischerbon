import React from 'react';
import { useEffect, useState } from 'react';

import DashboardLayout from './Layout';
import axiosInstance from '../../utils/axios.util';
import useAuth from '../../context/AuthContext';
import ProfileImage from '../../assets/autocadImage.jpg';
import { Instagram, Star, Twitter } from 'lucide-react';

import NotificationsList from '../../Components/NotificationList';
import EnrollmentTable from '../../Components/EnrollmentTable';
import CoursesTable from '../../Components/CoursesTable';
import StatCard from '../../Components/StatCard';

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
        <div className="text-center py-20 text-gray-600 font-semibold">
          Loading dashboard data...
        </div>
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
              <h3 className="text-xl font-semibold text-blue-600">
                Notifications
              </h3>
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
          <section id="profile" className="shadow rounded p-2 py-4 ">
            <div className="flex gap-2 items-center ">
              <div className="profile-image border w-[3rem] h-[3rem] rounded-full overflow-hidden">
                <img
                  src={ProfileImage}
                  className="w-[3rem] h-[3rem]"
                  alt="profile"
                />
              </div>
              <div className="flex flex-col ">
                <span className="text-[1.5rem] p-0 m-0">John Doe</span>
                <span className="text-gray-700 flex gap-2 text-[.9rem] p-0 m-0">
                  <span>Instructor</span>
                  <span>
                    <Star
                      fill="#ffa"
                      size={12}
                      className="inline text-yellow-500"
                    />{' '}
                    5.0
                  </span>
                </span>
              </div>
            </div>
            <div className="description my-4 text-[.9rem]">
              <p className="text-gray-700">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Velit
                rerum repellat delectus deleniti officia nam quo pariatur
                explicabo ullam illo.
              </p>
            </div>
            <div className="contact text-[.8rem]">
              <a
                href="https://instagram.com/simply_saad"
                target="_blank"
                rel="noreferrer"
                className=" flex gap-1 text-blue-600 hover:underline"
              >
                <Instagram className="inline" />
                <span>@simply_saad</span>
              </a>
              <a
                href="https://instagram.com/simply_saad"
                target="_blank"
                rel="noreferrer"
                className=" flex gap-1 text-blue-600 hover:underline"
              >
                <Twitter className="inline" />
                <span>@simply_saad</span>
              </a>
            </div>
          </section>
          <section id="extra" className="border h-auto ">
            extra
          </section>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
