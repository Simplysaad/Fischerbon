import React, { useEffect, useState } from 'react';

import { Star } from 'lucide-react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../utils/axios.util';
import useAuth from '../../context/AuthContext';
import formatCurrency from '../../utils/formatCurrency';

import Layout from './Layout';
import ProfileCard from '../../Components/ProfileCard';
import CourseCard from '../../Components/CourseCard';
import EmptyMessage from '../../Components/EmptyMessage';
import LessonBox from '../../Components/LessonBox';
import AuthModal from '../../Components/AuthModal';

const CourseDetailsSkeleton = () => {
  return (
    <Layout>
      <div className="flex max-md:flex-col  gap-3 p-4">
        <main className="md:w-[70%] shadow p-4">
          <section id="courseInfo" className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
            <div className="h-6 bg-gray-300 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6 mb-2"></div>
          </section>
          <section id="lessons" className="my-4">
            <h2 className="text-xl mb-2">Lessons</h2>
            <ul className="flex flex-col gap-3">
              {[...Array(5)].map((_, idx) => (
                <LessonBox.LessonBoxSkeleton key={idx} />
              ))}
            </ul>
          </section>
        </main>
        <aside className="md:w-[30%] flex-1">
          <ProfileCard.ProfileCardSkeleton />
        </aside>
      </div>
    </Layout>
  );
};

const CourseDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const courseId = slug.split('-').at(-1);
  const { user } = useAuth();

  const [course, setCourse] = useState(null);
  const [enrollment, setEnrollment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [enrollLoading, setEnrollLoading] = useState(false);
  const [enrollMessage, setEnrollMessage] = useState('');

  const [showAllLessons, setShowAllLessons] = useState(false);

  useEffect(() => {
    async function fetchCourseDetails() {
      setLoading(true);
      setEnrollMessage('');
      try {
        const { data: response } = await axiosInstance.get(
          `/courses/${courseId}`
        );
        if (!response?.success)
          throw new Error(response.message || 'Unable to fetch course details');
        const courseData = response.data;
        setCourse(courseData);

        // Detect enrollment from user context enrollments array
        const userEnrollment =
          user?.enrollments?.find((e) => e.courseId === courseData._id) || null;
        setEnrollment(userEnrollment);
      } catch (error) {
        console.error(error);
        setCourse(null);
      } finally {
        setLoading(false);
      }
    }
    fetchCourseDetails();
  }, [courseId, user]);

  async function enroll() {
    if (!user) {
      // setIsAuthModalOpen(true);
      navigate('/login?from=enrollment', {
        state: {
          from: {
            pathname: `/courses/${courseId}`,
          },
        },
      });
      return;
    }
    setEnrollLoading(true);
    setEnrollMessage('');
    try {
      const { data: response } = await axiosInstance.post(
        `/enrollments/new/${courseId}`
      );
      if (!response.success) {
        return setEnrollMessage(response.message || 'Enrollment failed');
      }

      if (response.message?.toLowerCase() === 'user is already enrolled') {
        // setEnrollment(user.enrollments.find((e) => e.courseId === courseId));
        setEnrollMessage('You are already enrolled in this course.');

        console.log(response?.data);
        setEnrollment(response?.data);
      } else if (response.message?.toLowerCase() === 'payment initialized') {
        window.location = response.data.authorization_url;
      } else {
        setEnrollMessage(response.message || 'Enrollment succeeded');
      }
    } catch (err) {
      console.error(err);
      // setEnrollMessage(err.message || 'An error occurred during enrollment.');
    } finally {
      setEnrollLoading(false);
    }
  }

  const EnrollButton = () => {
    const lastCompletedLesson = enrollment?.completedLessons
      .slice()
      .sort((a, b) => new Date(a.completedAt) - new Date(b.completedAt))
      ?.pop();

    if (enrollLoading) {
      return (
        <button
          disabled={true}
          className="px-4 py-2 bg-blue-400 text-white rounded cursor-not-allowed"
        >
          Processing...
        </button>
      );
    }

    if (enrollment) {
      return (
        <Link
          to={`/courses/${course.slug}/lessons/${lastCompletedLesson?.lessonId || course.lessons[0]?.slug}`}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Continue Learning
        </Link>
      );
    }

    return (
      <button
        onClick={enroll}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Enroll now
      </button>
    );
  };

  if (loading) return <CourseDetailsSkeleton />;

  if (!course) {
    navigate('/404');
    return null;
  }

  const completedLessonIds =
    enrollment?.completedLessons?.map((l) => l.lessonId) || [];
  const progressPercent = course.lessons
    ? (completedLessonIds.length / course.lessons.length) * 100
    : 0;

  const avgRating =
    course.ratings && course.ratings.length > 0
      ? (
          course.ratings.reduce((a, r) => a + r.rating, 0) /
          course.ratings.length
        ).toFixed(1)
      : 'No ratings';

  const formattedPrice =
    course.payment === 'free' ? 'Free' : formatCurrency(course.price);

  return (
    <Layout>
      {isAuthModalOpen && (
        <AuthModal setIsAuthModalOpen={setIsAuthModalOpen} next={enroll} />
      )}
      <div className="flex max-md:flex-col gap-3 p-4">
        <main className="md:w-[70%] shadow p-4">
          <section id="courseInfo">
            <div className="flex max-md:flex-col gap-3 items-start justify-between">
              <h1 className="text-[1.5rem]">{course.title}</h1>
              <div className="max-md:hidden">
                <EnrollButton />
              </div>
            </div>

            <div className="flex gap-3 py-4 text-gray-700 text-[1rem] items-center justify-start">
              <span className="rating items-center gap-1 flex">
                <Star fill="#ffa" size={12} className="text-yellow-400" />
                <span>{avgRating}</span>
              </span>
              <span className="price">{formattedPrice}</span>
            </div>

            <div className="md:hidden my-4 w-full flex">
              <EnrollButton />
            </div>

            {enrollMessage && (
              <div
                className={`my-2 text-sm font-semibold ${
                  enrollMessage.includes('error') ||
                  enrollMessage.includes('failed')
                    ? 'text-red-600'
                    : 'text-green-600'
                }`}
              >
                {enrollMessage}
              </div>
            )}

            <div className="description">
              <p>
                {isDescriptionExpanded
                  ? course.description
                  : course.description.split(' ').splice(0, 50).join(' ') +
                    (course.description.split(' ').length > 50 ? '...' : '')}
                <span
                  className="text-blue-600 cursor-pointer"
                  onClick={() =>
                    setIsDescriptionExpanded(!isDescriptionExpanded)
                  }
                >
                  {isDescriptionExpanded ? ' Show Less' : ' Read More'}
                </span>
              </p>
            </div>
          </section>

          <section id="lessons" className="my-4">
            <h2 className="text-xl mb-2">Lessons</h2>
            <ul className="flex flex-col gap-3">
              {!course.lessons || course.lessons.length === 0
                ? null
                : course.lessons
                    .slice(0, showAllLessons ? course.lessons.length : 5)
                    .map((lesson, idx) => (
                      <LessonBox
                        idx={idx}
                        key={lesson._id}
                        enrollment={enrollment}
                        course={course}
                        lesson={lesson}
                      />
                    ))}
              {course.lessons.length > 5 && (
                <li>
                  <button
                    className="text-blue-600"
                    onClick={() => setShowAllLessons(!showAllLessons)}
                  >
                    {showAllLessons
                      ? 'Show Less Lessons'
                      : `Show All Lessons (${course.lessons.length})`}
                  </button>
                </li>
              )}
            </ul>
          </section>

          {course.recommendations && (
            <section id="recommendations" className="my-4 py-6 w-full ">
              <h2 className="text-2xl mb-2">Recommendations</h2>
              <ul className="flex gap-4 overflow-scroll w-full">
                {course.recommendations.map((recommendation) => (
                  <li key={recommendation._id}>
                    <CourseCard course={recommendation} />
                  </li>
                ))}
              </ul>
            </section>
          )}
        </main>

        <aside className="md:w-[30%] flex-1">
          <ProfileCard user={course.instructor} />
          <section id="extra"></section>
        </aside>
      </div>
    </Layout>
  );
};

export default CourseDetails;
