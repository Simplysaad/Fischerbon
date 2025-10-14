import React, { useEffect, useState } from 'react';
import Hero from '../../Components/Hero';
import Header from '../../Components/Header';
import { Phone, Star, Users } from 'lucide-react';
import PublicLayout from './Layout';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../utils/axios.util';

const currentCourse = {
  _id: '1',
  title: 'AutoCAD Essentials: The Ultimate beginner course',
  description:
    'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione, nemo deleniti laudantium itaque totam blanditiis minima rerum omnis modi optio? Doloribus.',
  price: 23.99,
  payment: 'free',
  enrollments: 24,
  category: 'AutoCAD',
  level: 'beginner',
  thumbnailUrl: 'https://via.placeholder.com/400x240?text=AutoCAD+Beginner',
  ratings: [{ rating: 4 }, { rating: 5 }, { rating: 4 }],
  lessons: [
    {
      title: 'Introduction to AutoCAD ',
    },
  ],
  instructor: {
    _id: '12aac',
    name: 'IDRIS, SAAD',
    bio: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione, nemo deleniti laudantium itaque totam blanditiis minima rerum omnis modi optio? Doloribus.',
    profession: 'Pipeline Engineer',
    rating: 4.9,
  },
};

const CourseDetails = () => {
  const [course, setCourse] = useState(currentCourse);
  const { slug } = useParams();
  const navigate = useNavigate();
  let courseId = slug.split('-').at(-1);

  useEffect(() => {
    async function getCourseDetails() {
      const { data: response } = await axiosInstance.get(
        `/courses/${courseId}`
      );

      if (!response || !response.success) return null;

      return setCourse(response);
    }
    getCourseDetails();
  }, [courseId]);

  async function handleEnroll() {
    try {
      const { data: response } = await axiosInstance.get(
        `/enrollments/new/${courseId}`
      );

      if (!response || !response.success) return null;
      location.href = response?.data?.AuthorizationUrl ?? location.href + '/dj';
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <PublicLayout
      hero={{
        heading: course?.title,
        ctaText: 'Get Started',
        body:
          course?.description ||
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, harum ratione? Architecto tempora voluptates praesentium quia natus alias veniam blanditiis!',
      }}
    >
      <div className="lg:flex justify-between py-8  md:px-8 px-4">
        <section className="h-full lg:w-[60%]">
          <div className="">{/* <img src="" alt="" /> */}</div>
          <div className="text-start">
            <h2 className="font-semibold flex flex-col md:justify-between  text-[1.5rem] py-4">
              <span>{course.title}</span>
              <span className="text-[1.2rem] font-light">${course.price}</span>
            </h2>
            <p className="font-light pb-2">{course.description}</p>
            <ul className="text-gray-600 ">
              <li className="flex items-center gap-1">
                <Users size={12} />
                <span>89 students registered</span>
              </li>
              <li className="flex items-center gap-1">
                <Star size={12} />
                <span>4.9 rating</span>
              </li>
              <li className="flex items-center gap-1">
                <Phone size={12} />
                <span>24/7 Offline support</span>
              </li>
            </ul>
          </div>
          <div className="cta flex text-white gap-2 py-8">
            <button
              onClick={handleEnroll}
              className="hover:bg-blue-400 py-2 px-4 rounded bg-blue-500"
            >
              Enroll now
            </button>
            <button className="hover:bg-blue-400  py-2 px-4 rounded bg-blue-500">
              Add to Cart
            </button>
          </div>
          <h2 className="text-2xl py-4 font-semibold">What you'll learn:</h2>
          <div className="flex flex-col  md:flex-row flex-wrap gap-2 py-4">
            {course.lessons?.length === 0
              ? null
              : course.lessons.map((lesson, idx) => (
                  <div className="flex justify-start items-center gap-2 border rounded p-2 py-1 md:max-w-[100%]">
                    <span className="rounded-full text-center text-3xl font-bold px-4 py-2">
                      {idx + 1}
                    </span>
                    <span className="font-light">
                      <p className="">{lesson.title}</p>
                      {/* <p className="text-gray-600 font-lg">3 days</p> */}
                    </span>
                  </div>
                ))}
          </div>
        </section>
        <section
          id="instructorSection"
          className="lg:max-w-[30%] md:max-w-[100%] py-12 px-4"
        >
          {course.instructor && (
            <div className="flex flex-col">
              <h2 className="font-bold text-2xl py-4">Meet your Instructor</h2>
              {/* <img src="" alt="" /> */}
              <div className="flex flex-col">
                <p className="text-xl">{course.instructor.name}</p>
                <p className="text-gray-500">{course.instructor.profession}</p>
                <p className="flex  gap-1 items-center">
                  {course.instructor.rating}{' '}
                  <Star className="text-yellow-600" size={12} />
                </p>
              </div>
              <div className=" text-gray-600 py-4">{course.instructor.bio}</div>
            </div>
          )}
        </section>
      </div>
    </PublicLayout>
  );
};

export default CourseDetails;
//
