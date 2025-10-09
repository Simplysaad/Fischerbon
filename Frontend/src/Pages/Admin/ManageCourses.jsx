import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit2, Users } from 'lucide-react';
import axiosInstance from '../../utils/axios.util';
import DashboardLayout from './Layout';

export default function ManageCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCourses() {
      setLoading(true);
      try {
        const { data } = await axiosInstance.get('/admin/courses');
        if (data.success) {
          setCourses(data.data || []);
        } else {
          setError(data.message || 'Failed to fetch courses');
        }
      } catch (err) {
        setError(err.message || 'Error fetching courses');
      } finally {
        setLoading(false);
      }
    }

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-600 font-semibold">
        Loading courses...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-600 font-semibold">
        {error}
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto p-6">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-blue-700">Manage Courses</h1>
          <button
            onClick={() => navigate('/admin/courses/new')}
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            aria-label="Add new course"
          >
            <Edit2 className="w-5 h-5" />
            Add Course
          </button>
        </header>

        {courses.length === 0 ? (
          <p className="text-center text-gray-600 py-20 text-lg">
            No courses created yet. Click "Add Course" to get started.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map(
              ({ _id, title, description, enrollments, thumbnailUrl }) => (
                <div
                  key={_id}
                  className="bg-white rounded-lg shadow-md cursor-pointer hover:shadow-lg transition p-5 flex flex-col"
                  onClick={() => navigate(`/admin/courses/${_id}`)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') navigate(`/admin/courses/${_id}`);
                  }}
                  aria-label={`Edit course ${title}`}
                >
                  {thumbnailUrl ? (
                    <img
                      src={thumbnailUrl}
                      alt={`${title} thumbnail`}
                      className="rounded-md w-full h-48 object-cover mb-4"
                    />
                  ) : (
                    <div className="bg-gray-200 rounded-md w-full h-48 mb-4 flex items-center justify-center text-gray-400 select-none">
                      No Image
                    </div>
                  )}
                  <h2 className="text-xl font-semibold mb-2 text-blue-700">
                    {title}
                  </h2>
                  <p className="text-gray-700 truncate mb-4">{description}</p>
                  <div className="mt-auto flex items-center justify-between text-gray-600 font-medium">
                    <span className="inline-flex items-center gap-1">
                      <Users
                        className="w-5 h-5 text-blue-600"
                        aria-hidden="true"
                      />
                      {enrollments} Enrolled
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/admin/courses/${_id}/edit`);
                      }}
                      className="text-blue-600 hover:text-blue-800"
                      aria-label={`Edit course ${title}`}
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
