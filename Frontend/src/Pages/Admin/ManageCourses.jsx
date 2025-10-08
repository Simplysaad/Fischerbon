import React, { useState } from 'react';
import { PlusCircle, Edit2, Trash2, XCircle, Save } from 'lucide-react';
import DashboardLayout from './Layout';
const initialCourses = [
  {
    _id: '1',
    title: 'AutoCAD 3D Essentials',
    description: 'Learn 3D modeling with AutoCAD.',
    price: 29000,
  },
  {
    _id: '2',
    title: 'Basic CAD Drafting',
    description: 'Fundamentals of CAD drafting for beginners.',
    price: 15000,
  },
];

export default function AdminCourseManager() {
  const [courses, setCourses] = useState(initialCourses);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [currentCourse, setCurrentCourse] = useState({
    _id: '',
    title: '',
    description: '',
    price: '',
  });
  const [deleteConfirm, setDeleteConfirm] = useState({
    open: false,
    courseId: null,
  });

  // Open add course modal
  const openAddModal = () => {
    setCurrentCourse({ _id: '', title: '', description: '', price: '' });
    setModalMode('add');
    setModalOpen(true);
  };

  // Open edit course modal
  const openEditModal = (course) => {
    setCurrentCourse({ ...course, price: course.price.toString() });
    setModalMode('edit');
    setModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setModalOpen(false);
    setCurrentCourse({ _id: '', title: '', description: '', price: '' });
  };

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentCourse((prev) => ({ ...prev, [name]: value }));
  };

  // Save course (add or update)
  const handleSave = () => {
    if (
      !currentCourse.title.trim() ||
      !currentCourse.price ||
      isNaN(currentCourse.price)
    ) {
      alert('Please enter valid title and price');
      return;
    }

    if (modalMode === 'add') {
      const newCourse = {
        _id: Date.now().toString(),
        title: currentCourse.title.trim(),
        description: currentCourse.description.trim(),
        price: Number(currentCourse.price),
      };
      setCourses((prev) => [...prev, newCourse]);
    } else if (modalMode === 'edit') {
      setCourses((prev) =>
        prev.map((course) =>
          course._id === currentCourse._id
            ? {
                ...course,
                title: currentCourse.title.trim(),
                description: currentCourse.description.trim(),
                price: Number(currentCourse.price),
              }
            : course
        )
      );
    }
    closeModal();
  };

  // Confirm delete
  const confirmDelete = (id) => {
    setDeleteConfirm({ open: true, courseId: id });
  };

  // Cancel delete
  const cancelDelete = () => {
    setDeleteConfirm({ open: false, courseId: null });
  };

  // Perform delete
  const handleDelete = () => {
    setCourses((prev) =>
      prev.filter((course) => course._id !== deleteConfirm.courseId)
    );
    cancelDelete();
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-blue-700">Manage Courses</h1>
          <button
            onClick={openAddModal}
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            aria-label="Add new course"
          >
            <PlusCircle className="w-5 h-5" /> Add Course
          </button>
        </header>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 rounded-lg">
            <thead className="bg-blue-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-blue-600 uppercase tracking-wide">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-blue-600 uppercase tracking-wide">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-blue-600 uppercase tracking-wide w-32">
                  Price (NGN)
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-blue-600 uppercase tracking-wide w-32">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {courses.map(({ _id, title, description, price }) => (
                <tr key={_id} className="hover:bg-blue-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                    {title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700 truncate max-w-xs">
                    {description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-semibold">
                    ₦{price.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                    <button
                      onClick={() =>
                        openEditModal({ _id, title, description, price })
                      }
                      className="text-blue-600 hover:text-blue-800"
                      aria-label={`Edit ${title}`}
                    >
                      <Edit2 className="w-5 h-5 inline" />
                    </button>
                    <button
                      onClick={() => confirmDelete(_id)}
                      className="text-red-600 hover:text-red-800"
                      aria-label={`Delete ${title}`}
                    >
                      <Trash2 className="w-5 h-5 inline" />
                    </button>
                  </td>
                </tr>
              ))}
              {courses.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center py-6 text-gray-500">
                    No courses available. Please add a course.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Modal for Add/Edit */}
        {modalOpen && (
          <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-30 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6 relative">
              <header className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-blue-700">
                  {modalMode === 'add' ? 'Add New Course' : 'Edit Course'}
                </h2>
                <button
                  onClick={closeModal}
                  aria-label="Close modal"
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </header>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSave();
                }}
                className="space-y-5"
              >
                <div>
                  <label
                    htmlFor="title"
                    className="block font-semibold text-gray-700 mb-1"
                  >
                    Title <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    value={currentCourse.title}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block font-semibold text-gray-700 mb-1"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={3}
                    value={currentCourse.description}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="price"
                    className="block font-semibold text-gray-700 mb-1"
                  >
                    Price (NGN) <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="price"
                    name="price"
                    type="number"
                    min="0"
                    value={currentCourse.price}
                    onChange={handleChange}
                    required
                    className="w-40 border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
                  >
                    <Save className="w-5 h-5" />
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Dialog */}
        {deleteConfirm.open && (
          <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-30 p-4">
            <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Confirm Delete
              </h3>
              <p className="mb-6">
                Are you sure you want to delete this course? This action cannot
                be undone.
              </p>
              <div className="flex justify-center gap-6">
                <button
                  onClick={cancelDelete}
                  className="px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
