import React, { useEffect, useState } from 'react';
import PublicLayout from './Layout';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axios.util';
import useAuth from '../../context/AuthContext';
import lessonVideo from '../../assets/test.mp4';
import {
  ArrowBigLeft,
  ArrowLeft,
  ArrowRight,
  LucideArrowBigLeft,
} from 'lucide-react';

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
    (l) => l._id === lessonId
    // (l) => l.toString() === lessonId
  );

  // Navigation helpers
  const goToLesson = (index) => {
    if (index >= 0 && index < course.lessons.length) {
      navigate(`/courses/${courseId}/lessons/${course.lessons[index]}`);
    }
  };

  const hasPrev = lessonIndex > 0;
  const hasNext = lessonIndex < course.lessons.length - 1;
  const hasOnlyOne = !hasPrev || !hasNext;

  const isCompleted = enrollment?.completedLessons?.some(
    (cl) => cl.lessonId === lessonId
  );

  return (
    <PublicLayout>
      <section className="flex lg:gap-6 gap-4 px-4 py-6 flex-col md:flex-row">
        <main className="md:max-w-[70%]">
          {lesson.content?.video && (
            <div className="mb-6 w-[100%]">
              {lesson.content?.video && (
                <div className="mb-6">
                  <video
                    // src={lesson.content.video}
                    src={lessonVideo}
                    controls
                    className="w-full  rounded shadow"
                    preload="metadata"
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}
            </div>
          )}

          <section className="">
            <h2 className="font-bold text-xl">{lesson.title}</h2>
            <div
              className="my-4 prose max-w-none mb-6"
              dangerouslySetInnerHTML={{ __html: lesson.content?.text }}
            ></div>
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
                        {file?.split('/')?.at(-1).split('-').join('.')}
                        {/* {file.split('/').pop()} */}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div
              className={`cta ${hasOnlyOne ? '' : 'flex'}  justify-between gap-2`}
            >
              <button
                hidden={!hasPrev}
                disabled={!hasPrev}
                onClick={() => {
                  hasPrev &&
                    navigate(
                      `/courses/${courseId}/lessons/${course.lessons[lessonIndex - 1]._id}`
                    );
                }}
                className="py-2 float-start flex px-4 text-green-600 rounded underline"
              >
                <ArrowLeft />
                <span>Previous Lesson</span>
              </button>
              <button
                hidden={!hasNext}
                disabled={!hasNext}
                onClick={() => {
                  hasNext &&
                    navigate(
                      `/courses/${courseId}/lessons/${course.lessons[lessonIndex + 1]._id}`
                    );
                }}
                className="py-2 float-end flex justify-start px-4 text-green-600 rounded underline"
              >
                <span>Next Lesson</span>
                <ArrowRight />
              </button>
            </div>
          </section>
        </main>
        <aside className="min-w-[30%]">
          <h2 className="text-xl font-bold py-4">All Lessons</h2>
          <section className="w-full  flex flex-col gap-2">
            {course.lessons.length > 0 &&
              course.lessons.map((lesson, idx) => (
                <div
                  key={lesson._id || idx}
                  className={`flex justify-start  items-center gap-2 border rounded p-2 py-1 min-w-full cursor-pointer ${
                    false ? 'bg-green-100 border-green-400' : 'bg-white'
                    //  completed ? 'bg-green-100 border-green-400' : 'bg-white'
                  }`}
                  onClick={() => {
                    console.log(lesson.title);
                    console.log(
                      `/courses/${courseId}/lessons/${course.lessons[idx]._id}`
                    );
                    navigate(
                      `/courses/${courseId}/lessons/${course.lessons[idx]._id}`
                    );
                  }}
                  title={lesson.title}
                >
                  <span className="rounded-full text-center text-3xl font-bold px-4 py-2">
                    {idx + 1}
                  </span>
                  <span className="font-light">
                    {/* <p className={`${completed ? 'line-through text-green-600' : ''}`}> */}
                    <p className={`'line-through text-green-600'}`}>
                      {lesson.title}
                    </p>
                  </span>
                </div>
              ))}
          </section>
        </aside>
      </section>
    </PublicLayout>
  );
};

export default LessonDetails;
