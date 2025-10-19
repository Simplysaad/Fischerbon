import React, { useEffect, useState } from 'react';
import PublicLayout from './Layout';
import Header from '../../Components/Header';
import { Phone, Star, Users } from 'lucide-react';
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import axiosInstance from '../../utils/axios.util';
import useAuth from '../../context/AuthContext';

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
        // <Navigate to={'/login'} state={} />;
        return null;
      }
      const { data: response } = await axiosInstance.post(
        `/enrollments/new/${courseId}`
      );
      if (!response.success)
        throw new Error(response.message || 'Unable to enroll user');
      location.href = response.data.authorization_url;
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading course details...</div>;
  }

  if (!course) {
    return <div className="text-center py-12">Course not found.</div>;
  }

  // Calculate completed lessons IDs and progress percentage
  const completedLessonIds =
    enrollment?.completedLessons?.map((l) => l.lessonId) || [];
  const progressPercent = course.lessons?.length
    ? Math.round((completedLessonIds.length / course.lessons.length) * 100)
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
    course.payment === 'free' ? 'Free' : `$${(course.price / 100).toFixed(2)}`;

  return (
    <PublicLayout
    // hero={{
    //   heading: course.title,
    //   ctaText: enrollment ? 'Continue Learning' : 'Enroll now',
    //   body: course.description,
    // }}
    >
      <div className="lg:flex justify-between py-8 md:px-8 px-4">
        <section className="h-full lg:w-[60%]">
          {course.thumbnailUrl && (
            <img
              src={
                course.thumbnailUrl.startsWith('http')
                  ? course.thumbnailUrl
                  : `${import.meta.env.VITE_BACKEND_URL}/${course.thumbnailUrl}`
              }
              alt={course.title}
              className="rounded mb-4 max-h-56 w-full object-cover"
            />
          )}
          <div className="text-start">
            <h2 className="font-semibold text-[1.5rem] py-4 flex justify-between items-center">
              <span>{course.title}</span>
              <span className="text-[1.2rem] font-light">{formattedPrice}</span>
            </h2>
            <p className="font-light pb-2">{course.description}</p>
            <ul className="text-gray-600">
              <li className="flex items-center gap-1">
                <Users size={12} />
                <span>{course.enrollments || 0} students registered</span>
              </li>
              <li className="flex items-center gap-1">
                <Star size={12} />
                <span>{avgRating}</span>
              </li>
              <li className="flex items-center gap-1">
                <Phone size={12} />
                <span>24/7 Offline support</span>
              </li>
            </ul>
          </div>

          <div className="cta flex text-white gap-2 py-8">
            {enrollment ? (
              <button
                onClick={() =>
                  navigate(
                    `/courses/${courseId}/lessons/${
                      completedLessonIds.length > 0
                        ? completedLessonIds[completedLessonIds.length - 1]
                        : course.lessons[0]?._id
                    }`
                  )
                }
                className="bg-blue-500 hover:bg-blue-400 py-2 px-4 rounded"
              >
                Continue Learning
              </button>
            ) : (
              <>
                <button
                  onClick={handleEnroll}
                  className="hover:bg-blue-400 py-2 px-4 rounded bg-blue-500"
                >
                  Enroll now
                </button>
                <button className="hover:bg-blue-400 py-2 px-4 rounded bg-blue-500">
                  Add to Cart
                </button>
              </>
            )}
          </div>

          {enrollment && (
            <>
              <h3 className="text-xl font-semibold mb-4">
                Your Progress: {progressPercent}%
              </h3>
              <div className="w-full bg-gray-300 rounded-full h-4 mb-8">
                <div
                  className="bg-blue-600 h-4 rounded-full transition-width duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </>
          )}

          <h2 className="text-2xl py-4 font-semibold">Lessons</h2>
          <div className="flex flex-col md:flex-wrap md:flex-row gap-2 py-4">
            {course.lessons?.length === 0
              ? 'No Lessons Yet'
              : course.lessons.map((lesson, idx) => {
                  const completed = completedLessonIds.includes(lesson._id);
                  return (
                    <div
                      key={lesson._id || idx}
                      className={`flex justify-start items-center gap-2 border rounded p-2 py-1 md:max-w-[100%] cursor-pointer ${
                        completed ? 'bg-green-100 border-green-400' : 'bg-white'
                      }`}
                      onClick={() => {
                        if (enrollment) {
                          navigate(
                            `/courses/${courseId}/lessons/${lesson._id}`
                          );
                        }
                      }}
                      title={lesson.title}
                    >
                      <span className="rounded-full text-center text-3xl font-bold px-4 py-2">
                        {idx + 1}
                      </span>
                      <span className="font-light">
                        <p
                          className={`${completed ? 'line-through text-green-600' : ''}`}
                        >
                          {lesson.title}
                        </p>
                      </span>
                    </div>
                  );
                })}
          </div>
        </section>

        <section
          id="instructorSection"
          className="lg:max-w-[30%] md:max-w-[100%] py-12 px-4"
        >
          {course.instructor && (
            <div className="flex flex-col">
              <h2 className="font-bold text-2xl py-4">Meet Your Instructor</h2>
              <p className="text-xl">{course.instructor.name}</p>
              <p className="text-gray-500">{course.instructor.profession}</p>
              <p className="flex gap-1 items-center">
                {course.instructor.rating}{' '}
                <Star className="text-yellow-600" size={12} />
              </p>
              <div className="text-gray-600 py-4">{course.instructor.bio}</div>
            </div>
          )}
        </section>
      </div>
    </PublicLayout>
  );
};

export default CourseDetails;
