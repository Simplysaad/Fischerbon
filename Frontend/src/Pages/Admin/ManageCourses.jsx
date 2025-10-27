import React, { useState, useEffect, useCallback } from 'react';
import axiosInstance from '../../utils/axios.util';
import DashboardLayout from './Layout';

const levels = ['beginner', 'intermediate', 'advanced'];
const payments = ['free', 'paid'];

// API functions isolated outside component for clarity
const api = {
  fetchCourses: async () => {
    try {
      const { data: response } = await axiosInstance.get('/admin/courses');
      if (response?.success) return response.data;
    } catch (err) {
      console.error(err);
    }
  },
  createCourse: async (course) => {
    try {
      console.log(course);
      const formData = new FormData();
      for (const key in course) {
        const value = course[key];
        if (value instanceof File) {
          // Append single file with filename
          formData.append(key, value, value.name);
        } else if (
          Array.isArray(value) &&
          value.length > 0 &&
          value[0] instanceof File
        ) {
          // Append array of lessonFiles
          value.forEach((file) => {
            formData.append(key, file, file.name);
          });
        } else {
          // Append other types like string, number
          formData.append(key, value);
        }
      }
      const { data: response } = await axiosInstance.post(
        '/courses/create',
        formData
      );
      return response;
    } catch (error) {
      console.error('Error creating course:', error);
      throw error;
    }
  },
  updateCourse: async (courseId, updates) => {
    try {
      const formData = new FormData();
      for (const key in updates) {
        formData.append(key, updates[key]);
      }
      const { data: response } = await axiosInstance.post(
        `/courses/${courseId}`,
        formData
      );
      return response;
    } catch (error) {
      console.error(error);
    }
  },
  deleteCourse: async (courseId) => {
    try {
      const { data: response } = await axiosInstance.delete(
        `/courses/${courseId}/`
      );
      return response;
    } catch (error) {
      console.error(error);
    }
  },
  addLesson: async (courseId, lesson) => {
    try {
      const formData = new FormData();
      const { lessonForm, lessonFiles, lessonVideo } = lesson;

      for (let key in lessonForm) {
        console.log('lessonForm', key);
        formData.append(key, lessonForm[key]);
      }

      if (lessonFiles) {
        if (Array.isArray(lessonFiles)) {
          for (let file of lessonFiles) {
            console.log('lessonfile', file);
            formData.append('lessonFiles', file, file.name);
          }
        } else {
          formData.append('lessonFiles', lessonFiles, lessonFiles.name);
        }
      }

      console.log('lessonVideo', lessonVideo);
      lessonVideo &&
        formData.append('lessonVideo', lessonVideo, lessonVideo.name);

      const { data: response } = await axiosInstance.post(
        `/courses/${courseId}/lessons`,
        formData
      );
      return response;
    } catch (error) {
      console.error('Error adding lesson:', error);
      throw error;
    }
  },
  updateLesson: async (courseId, lessonId, updates) => {
    try {
      const formData = new FormData();
      const { lessonForm, lessonFiles, lessonVideo } = updates;

      for (let key in lessonForm) {
        console.log('lessonForm', key);
        formData.append(key, lessonForm[key]);
      }

      if (lessonFiles) {
        if (Array.isArray(lessonFiles)) {
          for (let file of lessonFiles) {
            console.log('lessonfile', file);
            formData.append('lessonFiles', file, file.name);
          }
        } else {
          formData.append('lessonFiles', lessonFiles, lessonFiles.name);
        }
      }

      console.log('lessonVideo', lessonVideo);
      lessonVideo &&
        formData.append('lessonVideo', lessonVideo, lessonVideo.name);

      const { data: response } = await axiosInstance.post(
        `/courses/${courseId}/lessons/${lessonId}`,
        formData
      );
      return response;
    } catch (error) {
      console.error('Error updating lesson:', error);
      throw error;
    }
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
  });
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState('');
  const [lessonVideo, setLessonVideo] = useState(null);
  const [lessonFiles, setLessonFiles] = useState(null);

  const [isCourseSubmitting, setIsCourseSubmitting] = useState(false);
  const [isLessonSubmitting, setIsLessonSubmitting] = useState(false);

  const [lessonForm, setLessonForm] = useState({
    _id: null,
    title: '',
    text: '',
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
      });
      setThumbnail(null);
      setThumbnailPreview(null);
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
      });
      setThumbnail(null);
      setThumbnailPreview(course.thumbnailUrl || '');
      resetLessonForm();
    }
  }, [selectedCourseId, courses]);

  const resetLessonForm = () => {
    setLessonForm({
      _id: null,
      title: '',
      text: '',
    });
    setLessonVideo(null);
    setLessonFiles(null);
  };

  // Cleanup function for object URLs
  useEffect(() => {
    return () => {
      if (thumbnailPreview && thumbnailPreview.startsWith('blob:')) {
        URL.revokeObjectURL(thumbnailPreview);
      }
    };
  }, [thumbnailPreview]);

  useEffect(() => {
    console.log(lessonFiles);
  }, [lessonFiles]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Revoke previous URL if it exists
    if (thumbnailPreview && thumbnailPreview.startsWith('blob:')) {
      URL.revokeObjectURL(thumbnailPreview);
    }

    const previewURL = URL.createObjectURL(file);

    setThumbnail(file);
    setThumbnailPreview(previewURL);
  };

  // Handle course form submission (create or update)
  const handleCourseSubmit = async (e) => {
    e.preventDefault();
    setIsCourseSubmitting(true);
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
        const response = await api.createCourse({ ...courseForm, thumbnail });
        if (!response.success) throw new Error(response.message);

        setCourses((prev) => [...prev, response.data]);
        setSelectedCourseId(response.data._id);
        setMsg('Course created successfully.');
      }
    } catch (e) {
      setError('Failed to save course: ' + e.message);
    } finally {
      setIsCourseSubmitting(false);
    }
  };

  // Handle lesson form submission (add or update)
  const handleLessonSubmit = async (e) => {
    e.preventDefault();
    setIsLessonSubmitting(true);

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
      setIsLessonSubmitting(true);
      if (lessonForm._id) {
        const response = await api.updateLesson(
          selectedCourseId,
          lessonForm._id,
          { lessonForm, lessonFiles, lessonVideo }
        );
        console.log(lessonFiles);
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
        const response = await api.addLesson(selectedCourseId, {
          lessonForm,
          lessonVideo,
          lessonFiles,
        });
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
    } finally {
      setIsLessonSubmitting(false);
    }
  };

  // Handle lesson file input
  // const handleFileChange = (e) => {
  //   const lessonFilesArray = Array.from(e.target.files);
  //   setLessonFiles(lessonFilesArray);
  // };

  const deleteLesson = async (courseId, lessonId) => {
    try {
      const response = await api.deleteLesson(courseId, lessonId);
      if (!response.success) throw new Error(response.message);

      // Update courses state to remove the deleted lesson
      setCourses((prev) =>
        prev.map((course) => {
          if (course._id !== courseId) return course;
          return {
            ...course,
            lessons: course.lessons.filter((l) => l._id !== lessonId),
          };
        })
      );

      resetLessonForm();
      setMsg('Lesson deleted successfully.');
    } catch (error) {
      setError('Failed to delete lesson: ' + error.message);
    }
  };

  return (
    <DashboardLayout>
      <div className="min-h-full bg-gray-50 p-6">
        <h1 className="text-3xl font-semibold mb-6">Course Management</h1>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Courses List */}
          <aside className="md:w-1/4 bg-white p-4 rounded shadow overflow-auto max-h-[600px]">
            <h2 className="text-xl font-semibold mb-4">Courses</h2>
            <ul>
              {courses?.map((course) => (
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
                });
                setThumbnail(null);
                setThumbnailPreview('');
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
                  {thumbnailPreview && (
                    <img
                      src={thumbnailPreview}
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
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={isCourseSubmitting}
                  className={`${isCourseSubmitting ? 'bg-blue-400' : 'bg-blue-600'} text-white rounded px-6 py-3 mt-2 hover:bg-blue-700 font-semibold`}
                >
                  {selectedCourseId ? 'Update Course' : 'Create Course'}
                </button>
                {selectedCourseId && (
                  <button
                    type="button"
                    onClick={() => {
                      api.deleteCourse(selectedCourseId);
                    }}
                    className={`border-red-600 border  text-red-600 rounded px-6 py-3 mt-2 hover:bg-blue-700 font-semibold`}
                  >
                    Delete Course
                  </button>
                )}
              </div>
            </form>

            {/* Lessons Management */}
            {selectedCourseId && (
              <section>
                <h2 className="text-xl font-semibold mb-4">Lessons</h2>
                <ul className="mb-6 space-y-3 max-h-48 overflow-auto border border-gray-300 rounded p-3 bg-gray-50">
                  {courses
                    .find((c) => c._id === selectedCourseId)
                    ?.lessons?.map((lesson, idx) => (
                      <li
                        key={lesson._id || idx}
                        className="p-3 bg-white rounded shadow-sm cursor-pointer hover:bg-indigo-50"
                        onClick={() =>
                          setLessonForm({
                            _id: lesson._id,
                            title: lesson.title,
                            text: lesson.content?.text,
                            // lessonVideo: lesson.video,
                            // lessonFiles: lesson.files,
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
                      // required
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
                    <label className="block font-medium mb-1">Video</label>
                    <input
                      type="file"
                      accept="video/*"
                      className="w-full border rounded px-3 py-2"
                      onChange={(e) => setLessonVideo(e.target.files[0])}
                      placeholder=""
                    />
                  </div>
                  <div>
                    <label className="block font-medium mb-1">
                      Upload Files
                    </label>
                    <input
                      type="file"
                      multiple
                      onChange={(e) =>
                        setLessonFiles(Array.from(e.target.files))
                      }
                      className="w-full"
                    />
                    {lessonFiles?.length > 0 && (
                      <ul className="mt-2 text-sm text-gray-700 list-disc list-inside">
                        {lessonFiles.map((f, i) => (
                          <li key={i}>{f.name || f}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <button
                    disabled={isLessonSubmitting}
                    type="submit"
                    className={`${isLessonSubmitting ? 'bg-blue-400' : 'bg-blue-600'} text-white rounded px-6 py-3 mt-2 hover:bg-blue-700 font-semibold`}
                  >
                    {lessonForm._id
                      ? 'Update Lesson'
                      : isLessonSubmitting
                        ? 'Adding Lesson...'
                        : 'Add Lesson'}
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
    </DashboardLayout>
  );
};

export default CourseManagement;
