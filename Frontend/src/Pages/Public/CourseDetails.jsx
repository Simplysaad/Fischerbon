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

const EnrollButton = () => (
  <div className="text-nowrap border border-blue-500 hover:bg-blue-500 hover:text-white px-2 py-2 rounded">
    {enrollment ? (
      <Link to={`/courses/${course.slug}/lessons/${course.lessons[0]?.slug}`}>
        Continue Learning
      </Link>
    ) : (
      <button onClick={handleEnroll}>Enroll now</button>
    )}
  </div>
);

const CourseDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const courseId = slug.split('-').at(-1);

  const { user } = useAuth();

  const [course, setCourse] = useState(null);
  const [enrollment, setEnrollment] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    async function fetchCourseDetails() {
      setLoading(true);
      try {
        // Fetch course data
        const { data: response } = await axiosInstance.get(
          `/courses/${courseId}`
        );
        if (!response?.success)
          throw new Error(response.message || 'Unable to fetch course details');
        const courseData = response.data;
        setCourse(courseData);

        // Detect enrollment from user context enrollments array
        if (user?.enrollments) {
          const userEnrollment = user.enrollments.find(
            (e) => e.courseId === courseData._id
          );
          setEnrollment(userEnrollment || null);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchCourseDetails();
  }, [courseId, user]);

  const handleEnroll = async () => {
    try {
      if (!user) {
        navigate('/login', { state: { from: location } });
        return null;
      }
      const { data: response } = await axiosInstance.post(
        `/enrollments/new/${courseId}`
      );
      if (!response.success)
        throw new Error(response.message || 'Unable to enroll user');
      location.href = response.data.authorization_url;
      window.location = response.data.authorization_url;
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading course details...</div>;
  }

  if (!course) {
    navigate('/404');
    return null; //<div className="text-center py-12">Course not found.</div>;
  }

  // Calculate completed lessons IDs and progress percentage
  let completedLessonIds = [];
  if (Array.isArray(enrollment?.completedLessons)) {
    completedLessonIds =
      enrollment.completedLessons.map((l) => l.lessonId) || [];
  }

  const progressPercent = course.lessons
    ? (completedLessonIds.length / course.lessons?.length) * 100
    : 0;

  // Calculate average rating
  const avgRating =
    course.ratings && course.ratings.length > 0
      ? (
          course.ratings.reduce((a, r) => a + r.rating, 0) /
          course.ratings.length
        ).toFixed(1)
      : 'No ratings';

  // Format price display
  const formattedPrice =
    course.payment === 'free' ? 'Free' : `${formatCurrency(course.price)}`;
  return (
    <Layout>
      <div className="flex max-md:flex-col  gap-3 p-4">
        ? Math.round((completedLessonIds.length / course.lessons.length) * 100)
        <main className="md:w-[70%] shadow p-4">
          <section id="courseInfo">
            <div className="flex  max-md:flex-col gap-3 items-start justify-between">
              <h1 className="text-[1.5rem]">{course.title}</h1>
              <div className="max-md:hidden">
                <EnrollButton />
              </div>
            </div>
            <div className="flex gap-3 py-4 text-gray-700 text-[1rem] items-center justify-start">
              <span className="rating items-center  gap-1 flex">
                <Star fill="#ffa" size={12} className="text-yellow-400" />
                <span>{avgRating}</span>
              </span>
              <span className="price">{formattedPrice}</span>
            </div>
            <div className="md:hidden my-4 w-full flex">
              <EnrollButton />
            </div>
            <div className="description">
              <span>{course.description}</span>
            </div>
          </section>
          <section id="lessons" className="my-4">
            <h2 className="text-xl mb-2">Lessons</h2>
            <ul className="flex flex-col gap-3">
              {!course.lessons || course.lessons.length === 0 ? (
                <EmptyMessage message={'No Lessons Yet'} />
              ) : (
                course.lessons?.map((lesson, idx) => (
                  <LessonBox
                    key={idx}
                    idx={idx}
                    enrollment={enrollment}
                    course={course}
                    lesson={lesson}
                  />
                ))
              )}
            </ul>
          </section>
          {course.recommendations && (
            <section id="recommendations" className="my-4 py-6 w-full ">
              <h2 className="text-2xl mb-2">Recommendations</h2>
              <ul className="flex gap-4 overflow-scroll w-full">
                {!course.recommendations ? (
                  <EmptyMessage
                    className=""
                    message={'No Recommendations Yet'}
                  />
                ) : (
                  course.recommendations?.map((course, idx) => (
                    <li key={idx}>
                      <CourseCard course={course} />
                    </li>
                  ))
                )}
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
