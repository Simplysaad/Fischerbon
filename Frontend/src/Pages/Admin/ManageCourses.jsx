import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axios.util';

const api = {
  fetchCourses: async () => {
    const { data: response } = await axiosInstance.get('/admin/courses');
    if (response.success) return response.data;
    else
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
    const newFormdata = new FormData();

    Object.keys(course).forEach((key) => {
      console.log(key, course[key]);
      newFormdata.append(key, course[key]);
    });

    console.log(course['th']);

    console.log(newFormdata.entries());
    console.log(Object.keys(course));

    try {
      const { data: response } = await axiosInstance.post(
        '/courses/create',
        newFormdata
      );
      console.log(response);
      if (response.success) return response.data;
      else return response.message;
    } catch (err) {
      console.error(err);
    }
  },
  updateCourse: async (courseId, updates) => {
    console.log('Updating course', courseId, updates);
    return { ...updates, _id: courseId };
  },
  addLesson: async (courseId, lesson) => {
    // POST /course/:id/lessons logic
    console.log('Adding lesson to', courseId, lesson);
    return { ...lesson, _id: Math.random().toString(36).substr(2, 9) };
  },
  updateLesson: async (courseId, lessonId, updates) => {
    console.log('Updating lesson', lessonId, 'in course', courseId, updates);
    return { ...updates, _id: lessonId };
  },
};

const handleImageChange = (e) => {
  const file = e.target.files[0];
  const inputName = e.target.name;
  if (!file) return;
  const previewURL = URL.createObjectURL(file);
  setThumbnail(file);
  setThumbnailPreview(previewURL);
  setData((prevForm) => ({
    ...prevForm,
    [inputName]: file,
    [`${inputName}Preview`]: previewURL,
  }));
};
const levels = ['beginner', 'intermediate', 'advanced'];
const payments = ['free', 'paid'];

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  // Form state for creating/editing a course
  const [courseForm, setCourseForm] = useState({
    title: '',
    description: '',
    price: 0,
    payment: 'paid',
    category: '',
    level: 'beginner',
    thumbnail: null,
  });

  // Form state for adding/editing lessons
  const [lessonForm, setLessonForm] = useState({
    _id: null,
    title: '',
    text: '',
    video: null,
    files: [],
  });

  // Error and status messages
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Load courses on mount
    (async () => {
      const data = await api.fetchCourses();
      setCourses(data);
      if (data.length) setSelectedCourseId(data[0]._id);
    })();
  }, []);

  // Select course and populate form
  useEffect(() => {
    if (!selectedCourseId) return;
    const course = courses.find((c) => c._id === selectedCourseId);
    if (!course) return;
    setCourseForm({
      title: course.title,
      description: course.description,
      price: course.price,
      payment: course.payment,
      category: course.category,
      level: course.level,
      thumbnailUrl: course.thumbnailUrl,
    });
    resetLessonForm();
  }, [selectedCourseId, courses]);

  const resetLessonForm = () => {
    setLessonForm({ _id: null, title: '', text: '', video: '', files: [] });
  };

  // Handle course form submit for create/update
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
        // update existing
        const updated = await api.updateCourse(selectedCourseId, courseForm);
        setCourses((prev) =>
          prev.map((c) => (c._id === selectedCourseId ? updated : c))
        );
        setMsg('Course updated successfully.');
      } else {
        // create new
        const created = await api.createCourse(courseForm);
        setCourses((prev) => [...prev, created]);
        setSelectedCourseId(created._id);
        setMsg('Course created successfully.');
      }
    } catch (err) {
      setError('Failed to save course.');
      console.error(err);
    }
  };

  // Handle lesson form submit for add/update
  const handleLessonSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMsg('');

    if (!lessonForm.title.trim()) {
      setError('Lesson title is required.');
      return;
    }

    try {
      if (!selectedCourseId) {
        setError('Select a course first.');
        return;
      }

      if (lessonForm._id) {
        // update lesson
        const updatedLesson = await api.updateLesson(
          selectedCourseId,
          lessonForm._id,
          lessonForm
        );
        setCourses((prev) =>
          prev.map((course) => {
            if (course._id !== selectedCourseId) return course;
            return {
              ...course,
              lessons: course.lessons.map((l) =>
                l._id === lessonForm._id ? updatedLesson : l
              ),
            };
          })
        );
        setMsg('Lesson updated successfully.');
      } else {
        // add new lesson
        const newLesson = await api.addLesson(selectedCourseId, lessonForm);
        setCourses((prev) =>
          prev.map((course) => {
            if (course._id !== selectedCourseId) return course;
            return { ...course, lessons: [...course.lessons, newLesson] };
          })
        );
        setMsg('Lesson added successfully.');
      }
      resetLessonForm();
    } catch {
      setError('Failed to save lesson.');
    }
  };

  // Handle file input (just storing file names for demo)
  const handleFileChange = (e) => {
    const filesArray = Array.from(e.target.files).map((file) => file.name);
    setLessonForm({ ...lessonForm, files: filesArray });
  };

  return (
    null || (
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
                  thumbnailUrl: '',
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
            {/* Feedback Messages */}
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
                  <label className="block font-medium mb-1">
                    Thumbnail URL
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    className="w-full border rounded px-3 py-2"
                    value={courseForm.thumbnail}
                    onChange={(e) =>
                      setCourseForm({
                        ...courseForm,
                        thumbnail: e.target.value,
                      })
                    }
                    placeholder="http://example.com/image.jpg"
                  />
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
                ></textarea>
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
                    ?.lessons.map((lesson) => (
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
                    <label className="block font-medium mb-1">
                      Upload Files
                    </label>
                    <input
                      type="file"
                      multiple
                      onChange={handleFileChange}
                      className="w-full"
                    />
                    {lessonForm.files.length > 0 && (
                      <ul className="mt-2 text-sm text-gray-700 list-disc list-inside">
                        {lessonForm.files.map((f, i) => (
                          <li key={i}>{f}</li>
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
                </form>
              </section>
            )}
          </main>
        </div>
      </div>
    )
  );
};

export default CourseManagement;
