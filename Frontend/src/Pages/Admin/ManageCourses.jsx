import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axios.util';
import { Editor, EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';

const levels = ['beginner', 'intermediate', 'advanced'];
const payments = ['free', 'paid'];

const api = {
  fetchCourses: async () => {
    const { data: response } = await axiosInstance.get('/admin/courses');
    if (response?.success) return response.data;
    return [
      {
        _id: '1',
        title: 'AutoCAD Beginner Fundamentals',
        description: JSON.stringify({
          blocks: [
            {
              key: '1',
              text: 'Learn basics of AutoCAD',
              type: 'unstyled',
              depth: 0,
              inlineStyleRanges: [],
              entityRanges: [],
              data: {},
            },
          ],
          entityMap: {},
        }),
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
            lessonVideo: '',
            lessonFiles: [],
          },
        ],
      },
      {
        _id: '2',
        title: 'Advanced CAD Modeling',
        description: JSON.stringify({
          blocks: [
            {
              key: '1',
              text: 'Master advanced modeling',
              type: 'unstyled',
              depth: 0,
              inlineStyleRanges: [],
              entityRanges: [],
              data: {},
            },
          ],
          entityMap: {},
        }),
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
    try {
      const formData = new FormData();
      for (const key in course) {
        const value = course[key];
        if (value instanceof File) {
          formData.append(key, value, value.name);
        } else if (
          Array.isArray(value) &&
          value.length > 0 &&
          value[0] instanceof File
        ) {
          value.forEach((file) => formData.append(key, file, file.name));
        } else {
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
    try {
      const formData = new FormData();
      const { lessonForm, lessonFiles, lessonVideo } = lesson;
      for (let key in lessonForm) formData.append(key, lessonForm[key]);
      if (Array.isArray(lessonFiles)) {
        for (let file of lessonFiles)
          formData.append('lessonFiles', file, file.name);
      } else if (lessonFiles) {
        formData.append('lessonFiles', lessonFiles, lessonFiles.name);
      }
      if (lessonVideo)
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
      for (const key in updates) formData.append(key, updates[key]);
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
    description: EditorState.createEmpty(),
    price: 0,
    payment: 'paid',
    category: '',
    level: 'beginner',
  });
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState('');
  const [lessonVideo, setLessonVideo] = useState(null);
  const [lessonFiles, setLessonFiles] = useState(null);
  const [lessonForm, setLessonForm] = useState({
    _id: null,
    title: '',
    text: '',
  });
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

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

  useEffect(() => {
    if (!selectedCourseId) {
      setCourseForm({
        title: '',
        description: EditorState.createEmpty(),
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
      let editorState = EditorState.createEmpty();
      try {
        if (course.description) {
          const rawContent = JSON.parse(course.description);
          editorState = EditorState.createWithContent(
            convertFromRaw(rawContent)
          );
        }
      } catch {
        editorState = EditorState.createEmpty();
      }
      setCourseForm({
        title: course.title,
        description: editorState,
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
    setLessonForm({ _id: null, title: '', text: '' });
    setLessonVideo(null);
    setLessonFiles(null);
  };

  useEffect(() => {
    return () => {
      if (thumbnailPreview && thumbnailPreview.startsWith('blob:')) {
        URL.revokeObjectURL(thumbnailPreview);
      }
    };
  }, [thumbnailPreview]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (thumbnailPreview && thumbnailPreview.startsWith('blob:')) {
      URL.revokeObjectURL(thumbnailPreview);
    }
    const previewURL = URL.createObjectURL(file);
    setThumbnail(file);
    setThumbnailPreview(previewURL);
  };

  const handleDescriptionChange = (newEditorState) => {
    setCourseForm((prevForm) => ({
      ...prevForm,
      description: newEditorState,
    }));
  };

  const handleCourseSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMsg('');

    if (!courseForm.title.trim()) {
      setError('Course title is required.');
      return;
    }

    try {
      const descriptionRaw = JSON.stringify(
        convertToRaw(courseForm.description.getCurrentContent())
      );
      const submitPayload = { ...courseForm, description: descriptionRaw };

      if (selectedCourseId) {
        const response = await api.updateCourse(
          selectedCourseId,
          submitPayload
        );
        if (!response.success) throw new Error(response.message);

        setCourses((prev) =>
          prev.map((c) => (c._id === selectedCourseId ? response.data : c))
        );
        setMsg('Course updated successfully.');
      } else {
        const response = await api.createCourse({
          ...submitPayload,
          thumbnail,
        });
        if (!response.success) throw new Error(response.message);

        setCourses((prev) => [...prev, response.data]);
        setSelectedCourseId(response.data._id);
        setMsg('Course created successfully.');
      }
    } catch (e) {
      setError('Failed to save course: ' + e.message);
    }
  };

  // Other event handlers and rendering logic unchanged...

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-semibold mb-6">Course Management</h1>
      <div className="flex flex-col md:flex-row gap-8">
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
                // description: EditorState.createEmpty(),
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
              <div
                style={{
                  border: '1px solid #ccc',
                  minHeight: '6em',
                  padding: '10px',
                }}
              >
                <Editor
                  editorState={courseForm.description}
                  onChange={handleDescriptionChange}
                  placeholder="Course description..."
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white rounded px-6 py-3 mt-2 hover:bg-blue-700 font-semibold"
            >
              {selectedCourseId ? 'Update Course' : 'Create Course'}
            </button>
          </form>

          {/* Lessons Management unchanged... */}
        </main>
      </div>
    </div>
  );
};

export default CourseManagement;
