import React, { useState, useEffect } from 'react';

// Mock data representing enrolled courses and progress
const mockEnrollments = [
  {
    id: 'course1',
    title: 'AutoCAD Beginner Fundamentals',
    instructor: 'Admin',
    progress: 75, // in percentage
    completedLessons: 15,
    totalLessons: 20,
    certificateEarned: false,
  },
  {
    id: 'course2',
    title: 'Revit Essentials',
    instructor: 'Admin',
    progress: 45,
    completedLessons: 9,
    totalLessons: 20,
    certificateEarned: false,
  },
  {
    id: 'course3',
    title: 'Advanced CAD Modeling',
    instructor: 'Admin',
    progress: 100,
    completedLessons: 30,
    totalLessons: 30,
    certificateEarned: true,
  },
];

const StudentDashboard = () => {
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    // Simulate API fetch
    setEnrollments(mockEnrollments);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">
        Your Learning Dashboard
      </h1>
      {enrollments.length === 0 ? (
        <p className="text-gray-600">
          You are not enrolled in any courses yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrollments.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-lg shadow p-6 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl font-semibold text-indigo-700 mb-2">
                  {course.title}
                </h2>
                <p className="text-gray-700 mb-4">
                  Instructor: {course.instructor}
                </p>
                <div className="mb-2">
                  <label
                    htmlFor={`progress-${course.id}`}
                    className="block text-gray-600 mb-1 font-medium"
                  >
                    Progress
                  </label>
                  <progress
                    id={`progress-${course.id}`}
                    className="w-full h-4 rounded overflow-hidden"
                    max="100"
                    value={course.progress}
                  />
                </div>
                <p className="text-gray-700 mb-2">
                  Lessons: {course.completedLessons} / {course.totalLessons}{' '}
                  completed
                </p>
                {course.certificateEarned && (
                  <p className="text-green-600 font-semibold mt-2">
                    🎉 Certificate Earned
                  </p>
                )}
              </div>
              <a
                href={`/courses/${course.id}`}
                className="inline-block mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition text-center"
              >
                Resume Course
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
