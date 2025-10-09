const courseDetails = {
  _id: 738,
  title: 'AutoCAD 3D Essentials',
  description: 'lorem ipsum dolor sit amet',
  price: 29000,
  enrollments: [
    {
      _id: 123,
      name: 'saad idris',
      enrolledAt: Date.now(),
      completed: true,
    },
  ],
  lessons: [
    {
      _id: 234,
      video: 'https://placehold.co/400',
      text: 'lorem ipsum dolor sit amet',
    },
  ],
};

import React, { useState } from 'react';
import { Edit2, Save, XCircle, Video, FileText } from 'lucide-react';

// Props: courseDetails fetched from backend
export default function AdminCourseDetails({ courseDetails }) {
  // Local state to toggle edit mode and track form values
  const [editMode, setEditMode] = useState(false);
  const [course, setCourse] = useState(courseDetails);

  // Form input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse((prev) => ({
      ...prev,
      [name]: name === 'price' ? Number(value) : value,
    }));
  };

  // Save button handler (would connect to API)
  const handleSave = () => {
    // TODO: API call to update course info
    setEditMode(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <header className="flex justify-between items-center border-b border-gray-200 pb-4 mb-6">
        <h1 className="text-3xl font-bold text-blue-700">
          {editMode ? 'Edit Course' : course.title}
        </h1>
        <button
          onClick={() => {
            if (editMode) {
              handleSave();
            } else {
              setEditMode(true);
            }
          }}
          aria-label={editMode ? 'Save changes' : 'Edit course details'}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          {editMode ? (
            <Save className="w-5 h-5" />
          ) : (
            <Edit2 className="w-5 h-5" />
          )}
          {editMode ? 'Save' : 'Edit'}
        </button>
      </header>

      {/* Course Info Form */}
      <section className="mb-8">
        <form className="space-y-6 max-w-3xl">
          <div>
            <label
              htmlFor="title"
              className="block font-semibold text-gray-700 mb-1"
            >
              Course Title
            </label>
            {editMode ? (
              <input
                id="title"
                name="title"
                type="text"
                value={course.title}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-lg text-gray-800">{course.title}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="description"
              className="block font-semibold text-gray-700 mb-1"
            >
              Description
            </label>
            {editMode ? (
              <textarea
                id="description"
                name="description"
                rows={4}
                value={course.description}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 resize-none"
              />
            ) : (
              <p className="text-gray-700 whitespace-pre-wrap">
                {course.description}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="price"
              className="block font-semibold text-gray-700 mb-1"
            >
              Price (NGN)
            </label>
            {editMode ? (
              <input
                id="price"
                name="price"
                type="number"
                min="0"
                value={course.price}
                onChange={handleChange}
                className="w-32 border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-800 font-medium">
                ₦{course.price.toLocaleString()}
              </p>
            )}
          </div>
        </form>
      </section>

      {/* Enrollments */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">
          Learners Enrolled ({course.enrollments.length})
        </h2>
        <div className="overflow-auto rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-blue-600 uppercase tracking-wide">
                  Learner Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-blue-600 uppercase tracking-wide">
                  Enrollment Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-blue-600 uppercase tracking-wide">
                  Completed
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {course.enrollments.map(
                ({ _id, name, enrolledAt, completed }) => (
                  <tr key={_id} className="hover:bg-blue-50">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                      {name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                      {new Date(enrolledAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {completed ? (
                        <span className="inline-flex items-center gap-1 text-green-600 font-semibold">
                          ✓ Completed
                        </span>
                      ) : (
                        <span className="text-gray-500">In Progress</span>
                      )}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Lessons */}
      <section>
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">
          Course Lessons ({course.lessons.length})
        </h2>
        <div className="space-y-6">
          {course.lessons.map(({ _id, video, text }) => (
            <div
              key={_id}
              className="bg-white rounded-lg shadow p-4 flex flex-col md:flex-row gap-4 md:items-center"
            >
              <div className="flex-shrink-0 w-full md:w-56">
                <video className="rounded-md w-full" src={video} controls />
              </div>
              <div className="flex-1">
                <p className="text-gray-700 whitespace-pre-wrap">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
