import React, { useEffect, useState } from 'react';
import PublicLayout from './Layout';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axios.util';
import useAuth from '../../context/AuthContext';

const LessonDetails = () => {
  const { courseSlug, lessonSlug } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [lesson, setLesson] = useState(null);
  const [course, setCourse] = useState(null);
  const [enrollment, setEnrollment] = useState(null);
  const [loading, setLoading] = useState(true);

  const courseId = courseSlug.split('-').at(-1);
  const lessonId = lessonSlug.split('-').at(-1);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const courseId = courseSlug.split('-').at(-1);
      const lessonId = lessonSlug.split('-').at(-1);

      try {
        // Fetch course to get lesson order and details
        const { data: response } = await axiosInstance.get(
          `/courses/${courseId}`
        );
        console.log(response);
        if (!response?.success) throw new Error('Failed to load course');
        setCourse(response.data);

        const currentLesson = response.data?.lessons?.find(
          (l) => l._id === lessonId
        );
        setLesson(currentLesson);

        // Get enrollment info for current user on this course
        const userEnrollment = user?.enrollments?.find(
          (e) => e.courseId === courseId
        );
        setEnrollment(userEnrollment || null);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [courseId, lessonId, user]);

  if (loading)
    return <div className="text-center py-12">Loading lesson...</div>;
  if (!lesson || !course)
    return <div className="text-center py-12">Lesson or course not found.</div>;

  const lessonIndex = course.lessons.findIndex(
    (l) => l.toString() === lessonId
  );

  // Navigation helpers
  const goToLesson = (index) => {
    if (index >= 0 && index < course.lessons.length) {
      navigate(`/courses/${courseId}/lessons/${course.lessons[index]}`);
    }
  };

  const hasPrev = lessonIndex > 0;
  const hasNext = lessonIndex < course.lessons.length - 1;

  const isCompleted = enrollment?.completedLessons?.some(
    (cl) => cl.lessonId === lessonId
  );

  return (
    <PublicLayout>
      <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow mt-8">
        <h1 className="text-2xl font-semibold mb-4">{lesson.title}</h1>

        {lesson.content?.video && (
          <div className="mb-6">
            <video
              src={lesson.content.video}
              controls
              className="w-full rounded shadow"
              preload="metadata"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        )}

        {lesson.content?.text && (
          <div
            className="prose max-w-none mb-6"
            dangerouslySetInnerHTML={{ __html: lesson.content.text }}
          />
        )}

        {lesson.content?.files?.length > 0 && (
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Resources & Files</h3>
            <ul className="list-disc list-inside text-blue-600">
              {lesson.content.files.map((file, idx) => (
                <li key={idx}>
                  <a
                    href={file}
                    download={file?.split('/')?.at(-1).split('-').join('.')}
                    rel="noopener noreferrer"
                    className="underline hover:text-blue-800"
                  >
                    {file.split('/').pop()}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div
          className={`mb-6 font-semibold ${isCompleted ? 'text-green-600' : 'text-yellow-600'}`}
        >
          {isCompleted ? '✓ Completed' : 'Not Completed'}
        </div>

        <div className="flex justify-between">
          <button
            disabled={!hasPrev}
            onClick={() => goToLesson(lessonIndex - 1)}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            disabled={!hasNext}
            onClick={() => goToLesson(lessonIndex + 1)}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </PublicLayout>
  );
};

export default LessonDetails;
