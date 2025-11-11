import React, { useEffect, useState, useCallback } from 'react';
import DashboardLayout from './Layout';
import useAuth from '../../context/AuthContext';
import axiosInstance from '../../utils/axios.util';
import ProfileCard from '../../Components/ProfileCard';
import EnrollmentCard from '../../Components/EnrollmentCard';
import EmptyMessage from '../../Components/EmptyMessage';

const filterOptions = [
  { name: 'All', value: '' },
  { name: 'In Progress', value: 'in_progress' },
  { name: 'Completed', value: 'completed' },
];

const Dashboard = () => {
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState([]);
  const [filteredEnrollments, setFilteredEnrollments] = useState([]);
  const [activeFilter, setActiveFilter] = useState('');
  const time = new Date().getHours();

  // Fetch enrollments once on mount
  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const { data } = await axiosInstance.get('/enrollments');
        if (!data.success) throw new Error(data.message);
        setEnrollments(data.data);
      } catch (error) {
        console.error('Failed to load enrollments:', error);
      }
    };
    fetchEnrollments();
  }, []);

  // Update filtered enrollments whenever enrollments or filter changes
  useEffect(() => {
    if (!activeFilter) {
      setFilteredEnrollments(enrollments);
    } else if (activeFilter === 'completed') {
      setFilteredEnrollments(enrollments.filter((e) => e.progress === 100));
    } else if (activeFilter === 'in_progress') {
      setFilteredEnrollments(enrollments.filter((e) => e.progress < 100));
    }
  }, [enrollments, activeFilter]);

  const handleFilterChange = useCallback((filterValue) => {
    setActiveFilter(filterValue);
  }, []);

  const greeting =
    time < 12 ? 'Good Morning' : time < 18 ? 'Good Afternoon' : 'Good Evening';
  const firstName = user?.name?.split(' ')[0] || '';

  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row gap-4 md:p-4 max-w-7xl mx-auto">
        <main className="md:w-2/3 w-full space-y-6">
          <header>
            <h1 className="text-3xl font-semibold text-gray-900">
              {greeting}
              {firstName && (
                <span className="font-light ml-1">{`, ${firstName}`}</span>
              )}
            </h1>
          </header>

          <section aria-labelledby="enrollments-heading">
            <div className="flex flex-wrap justify-between items-center gap-3 mb-4">
              <h2
                id="enrollments-heading"
                className="text-2xl font-medium text-gray-800"
              >
                Your Enrollments
              </h2>
              <div className="flex gap-2">
                {filterOptions.map(({ name, value }) => (
                  <button
                    key={value}
                    onClick={() => handleFilterChange(value)}
                    className={`px-4 text-[.8rem] py-2 rounded-full border transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                    ${activeFilter === value ? 'bg-blue-600 text-white border-blue-600' : 'text-blue-600 border-blue-600 hover:bg-blue-100'}`}
                    aria-pressed={activeFilter === value}
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {filteredEnrollments.length === 0 ? (
                <EmptyMessage
                  message="No enrollments found."
                  ctaUrl={'/courses'}
                  ctaText={'Check courses'}
                />
              ) : (
                <ul className="flex flex-col gap-2">
                  {filteredEnrollments.map((enrollment, idx) => (
                    <li key={enrollment._id || idx}>
                      <EnrollmentCard enrollment={enrollment} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        </main>

        <aside className="md:w-1/3 w-full space-y-4">
          <section className="border border-gray-300 rounded-lg p-4 shadow-sm">
            <ProfileCard user={user} />
          </section>
        </aside>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
