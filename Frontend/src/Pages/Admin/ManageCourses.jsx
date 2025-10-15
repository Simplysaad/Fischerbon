import React, { useState, useEffect, useCallback } from 'react';
import axiosInstance from '../../utils/axios.util';

const levels = ['beginner', 'intermediate', 'advanced'];
const payments = ['free', 'paid'];

// API functions isolated outside component for clarity
const api = {
  fetchCourses: async () => {
    const { data: response } = await axiosInstance.get('/admin/courses');
    if (response?.success) return response.data;
    // fallback data for dev/testing
    return [
      {
        _id: '1',
        title: 'AutoCAD Beginner Fundamentals',
        description: 'Learn basics of AutoCAD',
        price: 0,
        payment: 'free',
        category: 'AutoCAD',
        level: 'beginner',
        thumbnailUrl: '',
        lessons: [
          {
            _id: 'lesson1',
            title: 'Introduction',
            text: 'Welcome to AutoCAD Beginner',
            video: '',
            files: [],
          },
        ],
      },
      {
        _id: '2',
        title: 'Advanced CAD Modeling',
        description: 'Master advanced modeling',
        price: 199,
        payment: 'paid',
        category: 'CAD',
        level: 'advanced',
        thumbnailUrl: '',
        lessons: [],
      },
    ];
  },
  createCourse: async (course) => {
    const formData = new FormData();
    for (const key in course) {
      formData.append(key, course[key]);
    }
    const { data: response } = await axiosInstance.post(
      '/courses/create',
      formData,
      {
        'Content-Type': 'multipart/formdata',
      }
    );
    return response;
  },
  updateCourse: async (courseId, updates) => {
    const formData = new FormData();
    for (const key in updates) {
      formData.append(key, updates[key]);
    }
    const { data: response } = await axiosInstance.post(
      `/courses/${courseId}`,
      formData
    );
    return response;
  },
  addLesson: async (courseId, lesson) => {
    const formData = new FormData();
    for (const key in lesson) {
      formData.append(key, lesson[key]);
    }
    const { data: response } = await axiosInstance.post(
      `/courses/${courseId}/lessons`,
      formData
    );
    return response;
  },
  updateLesson: async (courseId, lessonId, updates) => {
    const formData = new FormData();
    for (const key in updates) {
      formData.append(key, updates[key]);
    }
    const { data: response } = await axiosInstance.post(
      `/courses/${courseId}/lessons/${lessonId}`,
      formData,
      { 'Content-Type': 'multipart/formdata' }
    );
    return response;
  },
  deleteLesson: async (courseId, lessonId) => {
    try {
      const { data: response } = await axiosInstance.delete(
        `/courses/${courseId}/lessons/${lessonId}`
      );
      return response;
    } catch (error) {
      console.error(error);
    }
  },
};

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [courseForm, setCourseForm] = useState({
    title: '',
    description: '',
    price: 0,
    payment: 'paid',
    category: '',
    level: 'beginner',
    thumbnail: null,
    thumbnailPreview: '',
  });
  const [lessonForm, setLessonForm] = useState({
    _id: null,
    title: '',
    text: '',
    video: '',
    files: [],
  });
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  // Fetch courses once on mount
  useEffect(() => {
    async function loadCourses() {
      try {
        const data = await api.fetchCourses();
        setCourses(data);
        if (data.length) setSelectedCourseId(data[0]._id);
      } catch (e) {
        setError('Error loading courses');
      }
    }
    loadCourses();
  }, []);

  // Update form when selected course changes
  useEffect(() => {
    if (!selectedCourseId) {
      setCourseForm({
        title: '',
        description: '',
        price: 0,
        payment: 'paid',
        category: '',
        level: 'beginner',
        thumbnail: null,
        thumbnailPreview: '',
      });
      resetLessonForm();
      return;
    }
    const course = courses.find((c) => c._id === selectedCourseId);
    if (course) {
      setCourseForm({
        title: course.title,
        description: course.description,
        price: course.price,
        payment: course.payment,
        category: course.category,
        level: course.level,
        thumbnail: null,
        thumbnailPreview: course.thumbnailUrl || '',
      });
      resetLessonForm();
    }
  }, [selectedCourseId, courses]);

  const resetLessonForm = () => {
    setLessonForm({
      _id: null,
      title: '',
      text: '',
      video: '',
      files: [],
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const previewURL = URL.createObjectURL(file);

    setCourseForm((prev) => ({
      ...prev,
      thumbnail: file,
      thumbnailPreview: previewURL,
    }));
  };

  // Handle course form submission (create or update)
  const handleCourseSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMsg('');

    if (!courseForm.title.trim()) {
      setError('Course title is required.');
      return;
    }

    try {
      if (selectedCourseId) {
        const response = await api.updateCourse(selectedCourseId, courseForm);
        if (!response.success) throw new Error(response.message);

        setCourses((prev) =>
          prev.map((c) => (c._id === selectedCourseId ? response.data : c))
        );
        setMsg('Course updated successfully.');
      } else {
        const response = await api.createCourse(courseForm);
        if (!response.success) throw new Error(response.message);

        setCourses((prev) => [...prev, response.data]);
        setSelectedCourseId(response.data._id);
        setMsg('Course created successfully.');
      }
    } catch (e) {
      setError('Failed to save course: ' + e.message);
    }
  };

  // Handle lesson form submission (add or update)
  const handleLessonSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMsg('');

    if (!lessonForm.title.trim()) {
      setError('Lesson title is required.');
      return;
    }

    if (!selectedCourseId) {
      setError('Select a course first.');
      return;
    }

    try {
      if (lessonForm._id) {
        const response = await api.updateLesson(
          selectedCourseId,
          lessonForm._id,
          lessonForm
        );
        if (!response.success) throw new Error(response.message);

        setCourses((prev) =>
          prev.map((course) => {
            if (course._id !== selectedCourseId) return course;
            return {
              ...course,
              lessons: course.lessons.map((l) =>
                l._id === lessonForm._id ? response.data : l
              ),
            };
          })
        );
        setMsg('Lesson updated successfully.');
      } else {
        const response = await api.addLesson(selectedCourseId, lessonForm);
        if (!response.success) throw new Error(response.message);

        setCourses((prev) =>
          prev.map((course) => {
            if (course._id !== selectedCourseId) return course;
            return { ...course, lessons: [...course.lessons, response.data] };
          })
        );
        setMsg('Lesson added successfully.');
      }
      resetLessonForm();
    } catch (e) {
      setError('Failed to save lesson: ' + e.message);
    }
  };

  // Handle lesson file input
  const handleFileChange = (e) => {
    const filesArray = Array.from(e.target.files);
    setLessonForm((prev) => ({ ...prev, files: filesArray }));
  };

  const deleteLesson = async (courseId, lessonId) => {
    try {
      const response = await api.deleteLesson(courseId, lessonId);
      if (!response.success) throw new Error(response.message);

      resetLessonForm();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-semibold mb-6">Course Management</h1>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Courses List */}
        <aside className="md:w-1/4 bg-white p-4 rounded shadow overflow-auto max-h-[600px]">
          <h2 className="text-xl font-semibold mb-4">Courses</h2>
          <ul>
            {courses.map((course) => (
              <li
                key={course._id}
                className={`cursor-pointer px-3 py-2 rounded mb-2 ${
                  course._id === selectedCourseId
                    ? 'bg-indigo-100 text-indigo-800 font-semibold'
                    : 'hover:bg-indigo-50'
                }`}
                onClick={() => setSelectedCourseId(course._id)}
              >
                {course.title}
              </li>
            ))}
          </ul>
          <button
            className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
            onClick={() => {
              setSelectedCourseId(null);
              setCourseForm({
                title: '',
                description: '',
                price: 0,
                payment: 'paid',
                category: '',
                level: 'beginner',
                thumbnail: null,
                thumbnailPreview: '',
              });
              resetLessonForm();
              setMsg('');
              setError('');
            }}
          >
            + New Course
          </button>
        </aside>

        {/* Course Form and Lessons */}
        <main className="md:w-3/4 bg-white rounded shadow p-6 overflow-auto max-h-[600px]">
          {msg && (
            <div className="bg-green-100 text-green-700 p-3 rounded mb-4">
              {msg}
            </div>
          )}
          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
              {error}
            </div>
          )}

          {/* Course Form */}
          <form onSubmit={handleCourseSubmit} className="mb-8 space-y-4">
            <h2 className="text-xl font-semibold mb-4">
              {selectedCourseId ? 'Edit Course' : 'Create New Course'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-1">Title</label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={courseForm.title}
                  onChange={(e) =>
                    setCourseForm({ ...courseForm, title: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Category</label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={courseForm.category}
                  onChange={(e) =>
                    setCourseForm({ ...courseForm, category: e.target.value })
                  }
                  placeholder="e.g. AutoCAD"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Level</label>
                <select
                  className="w-full border rounded px-3 py-2"
                  value={courseForm.level}
                  onChange={(e) =>
                    setCourseForm({ ...courseForm, level: e.target.value })
                  }
                  required
                >
                  {levels.map((lvl) => (
                    <option key={lvl} value={lvl}>
                      {lvl.charAt(0).toUpperCase() + lvl.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-medium mb-1">Payment</label>
                <select
                  className="w-full border rounded px-3 py-2"
                  value={courseForm.payment}
                  onChange={(e) =>
                    setCourseForm({ ...courseForm, payment: e.target.value })
                  }
                  required
                >
                  {payments.map((pay) => (
                    <option key={pay} value={pay}>
                      {pay.charAt(0).toUpperCase() + pay.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-medium mb-1">Price (USD)</label>
                <input
                  type="number"
                  min="0"
                  className="w-full border rounded px-3 py-2"
                  value={courseForm.price}
                  onChange={(e) =>
                    setCourseForm({
                      ...courseForm,
                      price: parseFloat(e.target.value),
                    })
                  }
                  disabled={courseForm.payment === 'free'}
                  required={courseForm.payment !== 'free'}
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Thumbnail</label>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full border rounded px-3 py-2"
                  onChange={handleImageChange}
                />
                {courseForm.thumbnailPreview && (
                  <img
                    src={courseForm.thumbnailPreview}
                    alt="Thumbnail Preview"
                    className="mt-2 rounded max-h-32 object-contain"
                  />
                )}
              </div>
            </div>
            <div>
              <label className="block font-medium mb-1">Description</label>
              <textarea
                className="w-full border rounded px-3 py-2"
                rows={4}
                value={courseForm.description}
                onChange={(e) =>
                  setCourseForm({
                    ...courseForm,
                    description: e.target.value,
                  })
                }
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white rounded px-6 py-3 mt-2 hover:bg-blue-700 font-semibold"
            >
              {selectedCourseId ? 'Update Course' : 'Create Course'}
            </button>
          </form>

          {/* Lessons Management */}
          {selectedCourseId && (
            <section>
              <h2 className="text-xl font-semibold mb-4">Lessons</h2>
              <ul className="mb-6 space-y-3 max-h-48 overflow-auto border border-gray-300 rounded p-3 bg-gray-50">
                {courses
                  .find((c) => c._id === selectedCourseId)
                  ?.lessons?.map((lesson) => (
                    <li
                      key={lesson._id}
                      className="p-3 bg-white rounded shadow-sm cursor-pointer hover:bg-indigo-50"
                      onClick={() =>
                        setLessonForm({
                          _id: lesson._id,
                          title: lesson.title,
                          text: lesson.text,
                          video: lesson.video,
                          files: lesson.files,
                        })
                      }
                    >
                      {lesson.title}
                    </li>
                  ))}
                {!courses.find((c) => c._id === selectedCourseId)?.lessons
                  .length && (
                  <li className="text-gray-400">No lessons added yet.</li>
                )}
              </ul>

              {/* Lesson Form */}
              <form onSubmit={handleLessonSubmit} className="space-y-4">
                <h3 className="text-lg font-semibold">
                  {lessonForm._id ? 'Edit Lesson' : 'Add New Lesson'}
                </h3>
                <div>
                  <label className="block font-medium mb-1">Title</label>
                  <input
                    type="text"
                    className="w-full border rounded px-3 py-2"
                    value={lessonForm.title}
                    onChange={(e) =>
                      setLessonForm({ ...lessonForm, title: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">Text</label>
                  <textarea
                    rows={3}
                    className="w-full border rounded px-3 py-2"
                    value={lessonForm.text}
                    onChange={(e) =>
                      setLessonForm({ ...lessonForm, text: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">Video URL</label>
                  <input
                    type="text"
                    className="w-full border rounded px-3 py-2"
                    value={lessonForm.video}
                    onChange={(e) =>
                      setLessonForm({ ...lessonForm, video: e.target.value })
                    }
                    placeholder="YouTube or direct video link"
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">Upload Files</label>
                  <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="w-full"
                  />
                  {lessonForm.files?.length > 0 && (
                    <ul className="mt-2 text-sm text-gray-700 list-disc list-inside">
                      {lessonForm.files.map((f, i) => (
                        <li key={i}>{f.name || f}</li>
                      ))}
                    </ul>
                  )}
                </div>
                <button
                  type="submit"
                  className="bg-green-600 text-white rounded px-6 py-3 hover:bg-green-700 font-semibold"
                >
                  {lessonForm._id ? 'Update Lesson' : 'Add Lesson'}
                </button>
                {lessonForm._id && (
                  <button
                    type="button"
                    className="ml-4 text-red-600 hover:underline"
                    onClick={resetLessonForm}
                  >
                    Cancel Edit
                  </button>
                )}
                {lessonForm._id && (
                  <button
                    type="button"
                    className="ml-4 text-red-600 hover:underline"
                    onClick={() =>
                      deleteLesson(selectedCourseId, lessonForm._id)
                    }
                  >
                    Delete Lesson
                  </button>
                )}
              </form>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default CourseManagement;
